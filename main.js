#!/usr/bin/env node

// load Elm module
const elm = require('./elm.js');

const elmVersion = 18;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const process = require('process');
const Commands = require('command-line-commands');
const Args = require('command-line-args');

const usage = _ => {
	const Usage = require('command-line-usage');
	console.log(Usage(
		[
			{ header: 'Grove', content: 'Advanced Elm Package Manager' },
			{ 	header: 'Synopsis',
				content: [
					'$ grove [bold]{version}',
					'$ grove [bold]{init}',
					'$ grove [bold]{install} [<options>] [<package> <package> ...]',
					'$ grove [bold]{uninstall} [<options>] <package> [<package> ...]',
					'$ grove [bold]{bump} [<options>]'
				]
			},
			{
				header: 'Commands',
				content: [
					{ name: 'help', summary: 'Displays this help' },
					{ name: 'version', summary: 'Displays this version of the program and the version of Elm supported' },
					{ name: 'init', summary: 'Create initial elm-package.json' },
					{ name: 'install', summary: 'Installs latest specified package(s) or the most recent allowed for all packages in elm-package.json' },
					{ name: 'uninstall', summary: 'Uninstalls specified package(s)' },
					{ name: 'bump', summary: 'Bump version number of package, either major, minor or patch' }
				]
			},
			{
				header: 'INSTALL options',
				content: [
					{ name: '[<package> <package> ...]', summary: 'One or more packages MAY be specified'},
					{ name: '--dry-run', summary: 'Do everything for an install except for affecting the repo, i.e. don\'t change elm-stuff, elm-package.json and package.json, also don\'t run `npm install`'},
					{ name: '--link', summary: 'Link to local repositories instead of remote by looking to `grove-links.json` for repository locations'},
					{ name: '--npm-production', summary: 'Used to pass to NPM during the installation to not include `dev-dependencies`'},
					{ name: '--npm-silent', summary: 'Used to silence the output of the `npm install`'},
					{ name: '--no-rewrite', summary: 'Skip rewriting Node `require` statements for hoisted Elm packages'},
				]
			},
			{
				header: 'UNINSTALL options',
				content: [
					{ name: '<package> [<package> ...]', summary: 'At least 1 package MUST be specified'},
					{ name: '--npm-production', summary: 'Used to pass to NPM during the uninstallation to not include `dev-dependencies`'},
					{ name: '--npm-silent', summary: 'Used to silence the output of the `npm uninstall`'},
					{ name: '--no-rewrite', summary: 'Skip rewriting Node `require` statements for hoisted Elm packages'},
				]
			},
			{
				header: 'BUMP options',
				content: [
					{ name: '--dry-run', summary: 'Do all checks without changing the version'},
					{ name: '--major', summary: 'bump MAJOR version in Elm and Npm packages'},
					{ name: '--minor', summary: 'bump MINOR version in Elm and Npm packages'},
					{ name: '--patch', summary: 'bump PATCH version in Elm and Npm packages'},
					{ name: '--allow-uncommitted', summary: 'bump version in spite of uncommitted changes to repo'},
					{ name: '--allow-old-dependencies', summary: 'bump version in spite of the existence of newer versions of dependencies'}
				]
			}
		]
	));
};
const installOptionsDef = [
	{ name: 'dry-run', type: Boolean },
	{ name: 'link', type: Boolean },
	{ name: 'npm-production', type: Boolean },
	{ name: 'npm-silent', type: Boolean },
	{ name: 'no-rewrite', type: Boolean },
];
const uninstallOptionsDef = [
	{ name: 'npm-production', type: Boolean },
	{ name: 'npm-silent', type: Boolean },
	{ name: 'no-rewrite', type: Boolean },
];
const bumpOptionsDef = [
	{ name: 'dry-run', type: Boolean },
	{ name: 'major', type: Boolean },
	{ name: 'minor', type: Boolean },
	{ name: 'patch', type: Boolean },
	{ name: 'allow-uncommitted', type: Boolean },
	{ name: 'allow-old-dependencies', type: Boolean }
];
const defaultOptions = {
	dryRun: false,
	link: false,
	npmProduction: false,
	npmSilent: false,
	major: false,
	minor: false,
	patch: false,
	allowUncommitted: false,
	allowOldDependencies: false,
	noRewrite: false
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const parse = _ => {
	try {
		const { command, argv } = Commands([ null, 'help', 'version', 'init', 'install', 'uninstall', 'bump' ]);
		if (command == null || command == 'help') {
			usage();
			process.exit(0);
		}
		if (command == 'version') {
			const fs = require('fs');
			const version = JSON.parse(fs.readFileSync('elm-package.json')).version;
			console.log('Grove version: ' + version + ' (Elm version: 0.' + elmVersion + '.x)');
			process.exit(0);
		}
		let options;
		switch (command.toLowerCase()) {
			case 'init':
				options = Args([]);
				break;
			case 'install':
				options = Args(installOptionsDef, {partial: true});
				break;
			case 'uninstall':
				options = Args(uninstallOptionsDef, {partial: true});
				break;
			case 'bump':
				options = Args(bumpOptionsDef, {partial: true});
				if (!options.major && ! options.minor && !options.patch)
					throw (Error ('You must specify one of the following: --major, --minor, --patch'));
				else if (options.major && options.minor || options.minor && options.patch || options.patch && options.major)
					throw (Error ('You may only specify one of the following: --major, --minor, --patch'));
				break;
			default:
				throw (Error ('BUG: command: ' + command + ' not handled'));
		}
		if (options._unknown) {
			options._unknown.slice(1).forEach(option => {
				if (option[0] == option[1] && option[0] == '-') {
					throw (Error ('Invalid option: ' + option));
				}
			});
		}
		const packages = options._unknown ? options._unknown.slice(1) : [];
		if (command == 'bump' && packages.length)
			throw (Error ('Specifying packages is INVALID for `bump` command'));
		delete options._unknown;
		return {command, options, packages};
	}
	catch (err){
		console.error('\x1B[31mInvalid command:', err && err.message ? err.message : err, '\x1B[0m');
		usage();
		process.exit(-2);
	}
};
const { command, options, packages } = parse();
const newOptions = Object.keys(options).reduce((newOptions, key) => {
	newOptions[key.replace(/-([a-z])/g, (_, submatch) => submatch.toUpperCase())] = options[key];
	return newOptions;
}, {});
const flags = {
	elmVersion,
	command: command.toLowerCase(),
	pathSep: require('path').sep,
	testing: process.cwd() == __dirname && !process.argv[1].endsWith('grove'),
	cwd: process.cwd(),
	options: Object.assign({}, defaultOptions, newOptions), packages
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ports;
const check = require('check-node-version');
check((err, result) => {
	if (err) {
		console.error('\x1B[31mUnable to determine Npm version:', err, '\x1B[0m');
		process.exit(-2);
	}
	else {
		if (result.npm.version.major < 5) {
			console.error('\x1B[31mNpm version:', result.npm.version.raw, 'is incompatible. Must be 5.x.x or greater.', '\x1B[0m');
			process.exit(-2);
		}
		ports = elm.Grove.App.worker(flags).ports;
		ports.exitApp.subscribe(exitCode => {
			process.exit(exitCode);
		});
	}
});

// keep our app alive until we get an exitCode from Elm or SIGINT or SIGTERM (see below)
setInterval(id => id, 86400);

process.on('uncaughtException', err => {
	console.log('Uncaught exception:\n', err);
	process.abort();
});

process.on('SIGINT', _ => {
	process.exit(1);
});

process.on('SIGTERM', _ => {
	console.log('SIGTERM received.');
	process.exit(1);
});
