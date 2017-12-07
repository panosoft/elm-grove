<p align="center"><img src="Grove Logo.svg" width=256 style="max-width:100%">

# Grove

> **Installs any Elm package from any Git server including both Elm and NPM dependencies**

**WARNING: This is NOT the [Official Elm Package Manager](https://guide.elm-lang.org/install.html#elm-package). Grove can install official and non-official packages. If you use Grove to install non-official packages, realize that those packages offer NO GUARANTEES regarding RUNTIME ERRORS.**

## Using Grove Safely
You can, however, benefit from all of the advanced Grove features AND all the runtime safety of the Official Elm Packages by configuring Grove to operate in safe mode ([see Configure Grove for Safety](#configure-grove-for-safety)).

### Major features:
- Written in Elm
- Enforce Semantic Version
- Supports Official, Native and Effects Manager packages
- Install from Github, Gitlab, private Git servers, etc.
- Install local packages during development (via symbolic links)
- Manage Elm and NPM dependencies (works without NPM as well)
- Uninstall packages
- Bump package version with validations (with git check in)
- Create documentation markdown from code comments (module & function)
- Initialize package (create `elm-package.json`)

### Roadmap:
- Elm 0.19 support (once released)

## Install
Make sure you have the following:

- Elm version 0.18.x
- npm version 5.3.0

#### NPM 5.x.x issues

**Due to npm 5.x.x bugs, installing AND updating grove globally will have to be done unconventionally, for now.**

Also, if you encounter access denied or permission issues using `npm` you may want to consult [Fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

#### Installing grove
```bash
cd ~
git clone https://github.com/panosoft/elm-grove
cd elm-grove
sudo npm link
```

#### Updating grove
```bash
cd ~/elm-grove
git pull
sudo npm link
```

## Configure Grove For Safety

### Global/Local Safety

You can configure Grove either Globally or Locally. There is a command line option, `--local` that can be used on the `grove config` command to configure local safety only.

Local configuration overrides Global. So you can set Global as `--safe=on` and then set a particular repository's Local as `--local --safe=none`.

### SafeMode On
```bash
grove config --safe=on
```
This will DISALLOW Non-official Elm Packages from being installed.

NOTE: This check is NOT performed when you link to local packages since it is assumed that these packages are part of your codebase.

### SafeMode Off
```bash
grove config --safe=off
```

This will ALLOW Non-official Elm Packages from being installed, but will display a WARNING to remind you of the risks.

NOTE: This check is NOT performed when you link to local packages since it is assumed that these packages are part of your codebase.

### SafeMode None
```bash
grove config --safe=none
```

This will produce no messages regarding package statuses.

### Remove SafeMode Configuration

```bash
grove config --safe=
```

This will REMOVE the safe mode option from Grove's configuration file, e.g. when you no longer want the local override (the above command would need the `--local` option in that particular case).

### Configuration Files

Grove's global configuration file, `grove-config.json`, is in the user's home directory. Local configuration files are at the root of the repository.

## Simple Example 1

Assuming you're starting a new project that needs the following:

- `elm-lang/core`

```bash
grove init
grove install
```

The `grove init` adds `elm-lang/core` in `elm-package.json`. The `grove install` installs all packages in `elm-packages.json`, which is `elm-lang/core`.

## Simple Example 2

Assuming you're starting a new project that needs the following:

- `elm-lang/core`
- `elm-lang/html`
- `panosoft/elm-utils`
- `group/repo` (from Gitlab at `gitlab.private.com`)

```bash
grove init
grove install elm-lang/html panosoft/elm-utils git@gitlab.private.com:group/repo
```

The `grove init` adds `elm-lang/core` in `elm-package.json`. The `grove install` adds the specified of the packages to `elm-package.json` and installs all packages.

## The Problems Grove Solves

##### Native packages are forbidden

The standard package manager that comes with Elm is very limited. It will not accept packages with Native code in them. This rules out any server side code, Effects Managers, Elm running in Electron or on mobile devices.

- `Grove` supports packages that have native code.

##### NPM isn't supported

When written for node servers, Elm packages that have NPM dependencies must be manually added to the main program's `package.json`. You also must manually check to make sure that the top-level NPM packages are **semantically equivalent** versions. (see [Code Rewriting](#code-rewriting))

- `Grove` updates your program's `package.json` with packages that have native code and then runs `npm install` and `npm uninstall` automatically. It also removes the need for semantic equivalence.

##### Developing dependent packages simultaneously is not supported

When you're working on multiple repositories at once and there are interdependencies (e.g. Repo1 depends on Repo2 and Repo3) and all of these repositories are being changed in unison, it becomes very difficult to test since there is no way to reference the local repositories.

One solution is to use NoRedInks's `elm_self_publish` but that becomes problematic when Repo2 depends on Repo3 directly but Repo1 does not. Since `elm_self_publish` updates Repo1's Elm package JSON for each repository that it copies, Repo1's Elm dependencies now includes Repo3 even though it should NOT since its an **indirect** dependency.

Another solutions are to manually copy these files or create symbolic links to the local repositories but these are time consuming, error prone and tedious.

- `Grove` can automatically create links to local repositories.

##### Difficult to check for outdated dependencies

It's too easy to release packages that depend on older versions. The only way to check is by manually going to Github and checking for a newer version.

- This check is done during a version bump in `Grove` (see [Releasing a package](#releasing-a-package)).

##### Package sources are limited

Installing from locations other than Github is not possible with the standard package manager.

- `Grove` will accept fully qualified package names allowing it support any Git server.

# Usage

## General Usage

The general command-line format is:

```bash
grove <command> [options]
```
### Get help

This command will print the command-line help.

```bash
grove help
```

### Check program's version

This command will print the version of `Grove` and the version of Elm that's supported.

```bash
grove version
```

## Basic Usage

### Initialize a package

```bash
grove init
```

##### elm-package.json

This command will build a bare-bones `elm-package.json` file. In order to do this, it will prompt you for the following:

- `Summary of package` - a general description of the package
- `Repository name` - the name of the repository in the format: `group/name`. Github naming conventions are adhered to.
- `License` - type of license for the package
- `Source directory` - relative directory where the package code is stored

When prompted, the string in the brackets, [], is the default value if one is supported.

The following are the values of items that are NOT prompted for and therefore are constants:

- `Version` - set to 0.0.0
- `Exposed Modules` - is an empty List
- `Native Modules` - the flag is NOT included
- `Dependencies` - `elm-lang/core` is the one and only dependency, to add more use `grove install`
- `Elm Version` - the current version supported to the next version

##### package.json

The `init` command will also prompt you to create a *minimal* `package.json`. If you respond with Yes, then the following keys will be created:

- `Name` - set based on the `Repository name` prompt
- `Version` - set to 0.0.0
- `License` - set based on the `License` prompt


### Install packages

#### Installing `elm-lang/html`

```bash
grove install elm-lang/html
```

#### Installing multiple packages

```bash
grove install elm-node/core panosoft/elm_parent_child_update
```

#### Installing `myGroup/repo` from Gitlab at `gitlab.mydomain.com`

```bash
grove install git@gitlab.mydomain.com:myGroup/repo
```

#### Details

This command installs `<package>` which can have the following formats:

```bash
<repo>
git@<hostname>:<repo>[.git]
http[s]://<hostname>/<repo>[.git]
```

where:

- `<repo>` - the repository name in the form `group/name`, e.g. `panosoft/elm-grove`
- `<hostname>` - the name of the Git server, e.g. `gitlab.mydomain.com` or `github.com`
- `[.git]` - optional (may be required by some Git servers)

When ONLY `<repo>` is specified then Github is assumed and the following format is used:

```bash
https://github.com/<repo>.git
```


### Uninstalling packages

Uninstalling packages removes the packages from Elm Packages and then it performs an Install minus the Npm install step. Then Npm Uninstall is performed.

#### Uninstalling `elm-community/list-extra`

```bash
grove uninstall elm-community/list-extra
```

#### Uninstalling multiple packages

```bash
grove uninstall panosoft/elm-postgres elm-community/result-extra
```

#### Uninstalling `myGroup/repo` from Gitlab at `gitlab.mydomain.com`

```bash
grove uninstall myGroup/repo
```

#### Details

This command uninstalls `<package>` which can have the following the formats:


```bash
<repo>
git@<hostname>:<repo>[.git]
http[s]://<hostname>/<repo>[.git]
```

where:

- `<repo>` - the repository name in the form `group/name`, e.g. `panosoft/elm-grove`
- `<hostname>` - the name of the Git server, e.g. `gitlab.mydomain.com` or `github.com`
- `[.git]` - optional (may be required by some Git servers)

While the other formats are supported, it's easiest to just use the `<repo>`.

## Advanced Usage

### Creating documentation

Both Module and Function Comments, which are just markdown, will be used to create documentation in a directory called `docs`. Grove uses the `panosoft/elm-docs` package to generate documentation.

Please see [panosoft/elm-docs](https://github.com/panosoft/elm-docs) for documentation on how to comment your code for documentation generation.

#### Configuring Grove for AUTOMATIC documentation creation

During a `bump` command, you can configure Grove to automatically generate documentation.

```bash
grove config --local --docs=on
```

Typically, documentation configuration will be locally configured, but it can also be set globally by omitting the `--local` option.

When `--docs=on`, then the `bump` command will generate documentation.

You can disable documentation generation by using `docs=off` or remove it completely from the configuration by using `docs=`.

#### Using Grove to MANUALLY generate documentation

This gives you a chance to debug your documentation before you release your package.

```bash
grove docs
```

### Installing a local package

```bash
grove install --link git@gitlab.mydomain.com:myGroup/elm-thing
```

When the `link` option is specified, grove will consult the `grove-links.json` (in the current directory) to determine which repos are to be installed with symlinks to local directories.

When running the command in the above example, `elm-thing` will NOT be linked if it is NOT in `grove-links.json`. Instead it will be installed from `gitlab.mydomain.com`.

It's also important to fully qualify the repository so that `dependency-sources` are properly updated in the Elm Package Json.

#### grove-links.json

It is STRONGLY advised that `grove-links.json` is in your global `.gitignore` (or at least the local package's `.gitignore`) to ensure it never gets checked in.

Here the `keys` are package names and the `values` are paths to the local package that will be linked to. Paths can contain Environment Variables in the form `{<env-variable-name>}`.

Here's an example `grove-links.json`:

```json
{
	"myGroup/elm-thing": "{ELMDEV}/myGroup/elm-thing",
	"anotherGroup/elm-other-thing": "{ELMDEV}/anotherGroup/elm-other-thing"
}
```

where

- `{ELMDEV}` - the value of the Environment Variable `ELMDEV`


### Releasing a package

There are 3 types of releases:

1. Normal - `HEAD` is based on the most recent release
2. Rebased - `HEAD` is based on a release that is not the most recent of it's major version
3. Legacy - `HEAD` is based on an older `major` release number

For details on release scenarios see [Understanding Release Scenarios](#understanding-release-scenarios).

#### Pre-release

The `bump` command performs many validation steps prior to optionally generating documentation and bumping the version.

It is HIGHLY RECOMMENDED that you use the `--dry-run` option to validate and display the differences between `HEAD` and the latest version `HEAD` is based on.

This gives you a chance to see if you **unintentionally** made breaking changes.

Here is an example of what the output looks like:

<p align="center"><img src="images/bump dry-run.png">

#### Release

Releasing a package is a 2-step process.

1. Bump version using `grove bump` command
2. Pushing repo with `git push && git push --tags` (Without the `git push --tags` command, the latest version of the package will not be recognized by `Grove`.)


##### Bump version (Step 1)

Package versions are controlled by git tags, e.g. a tag `1.0.2` is a valid version tag whereas tag `1.0.2a`, `test` and `1.2` are not.

Versions are of the following format:

```
	<major>.<minor>.<patch>
```
where:

- `major`, `minor` and `patch` are numbers

Grove automatically determines the version number based on public interface changes following the [semver rules](http://semver.org/):

* major - breaking change in public interface, NOT backward compatible
* minor - additional functionality added to public interface
* patch - no public interface changes

```bash
grove bump
```

This will bump the version in both Elm and NPM package Json files (`elm-package.json` and `package.json`) keeping them in lock-step and then check in the Elm and NPM package Json files into git and tag that commit with the bumped version.

For details on how the version number is determined see [Version Determination](#version-determination) and [Understanding Release Scenarios](#understanding-release-scenarios).

Numerous validations are performed prior to doing the bump:

- the latest version tag in the repo is the same version in both Elm and NPM package JSON Files
- the latest version tag in Elm package JSON matches the latest release your code is based on
- no links installed in `elm-stuff`, i.e. this package, which is about to be released, MUST NOT be using any non-released packages
- all packages in `elm-package.json` are the latest versions (override with `--allow-old-dependencies`)
- no uncommitted changes (override with `--allow-uncommitted`)


##### Push repository (Step 2)

Next, you must MANUALLY push the repo AND tags via:

```bash
git push && git push --tags
```
Without the `git push --tags` command, the latest version of the package will not be recognized by `Grove`.

## Version Determination

There are 2 types of Packages:

1. Library, e.g. `panosoft/elm-utils`
2. Application, e.g. `panosoft/elm-grove`

#### Libraries

Libraries expose modules via `elm-package.json`. Grove determines the version based on changes to the Public Interface of the package, i.e. the exposed functions of the exposed modules. The logic follows [semver rules](http://semver.org/):

1. Changes to an existing exposed function = Major
2. Deletion of a previously exposed function = Major
3. Addition of a new exposed function = Minor
4. Otherwise = Patch

#### Applications

Applications do NOT have public interfaces, so you must provide the version type via `bump` options `--major`, `--minor`, or `--patch`.

##### False positives

Grove uses the documentation feature that is built-in to the Elm compiler to determine changes to the public interface. It compares `HEAD` with the most recent release that `HEAD` is based on.

There are times where this can produce false positives, i.e. Grove will *think* something has changed when it effectively has not, e.g.:

Version `3.0.1` code:

```elm
rename : String -> Task Error ()
rename filename =

```

`HEAD` code (based on `3.0.1`):

```elm

type alias Filename =
    String

rename : Filename -> Task Error ()
rename filename =

```

Here we have aliased types that cause a difference in signatures even though they are semantically equivalent.

This is a limitation in the Elm compiler since it doesn't provide additional information regarding the `fully reduced` to a non-aliased type.

At the moment, Grove doesn't try to resolve this. The hope is that, someday, Elm will resolve this issue when generating documentation. As far as I know, the standard Elm package manager also suffers from such a deficiency.

## Understanding Release Scenarios

In order to understand Release Scenarios, let's assume the following `git` history where the smaller circles are releases and the larger circles all the possible `HEAD`s of your repo:

<p align="center"><img src="images/Release Scenarios.png">


#### Normal Release (Typical case)

A `Normal` release occurs when `HEAD` is based on the most recent release, in this example, that is `3.0.1`.

#### Legacy Release (Support multiple major versions)

If you need to support an older version of your package, e.g. to support an older version of Elm, then you are going to be making a `Legacy Release`.

A `Legacy` release is where the `HEAD` is based off of an older `major` release, e.g. `2.1.0` or `1.2.0`.

`Legacy` releases are RESTRICTED to `minor` and `patch`. If your code makes breaking changes, then Grove will exit with an error.

#### Rebased Release (Rare case to revert back to an old codebase)

If for some reason, you decide to base your next release on code from an older release, it is considered a `Rebased` release in Grove.

There are 2 types of rebased releases:

1. (**Rebased**) `HEAD` is based off of an older release that shares the same `major` version as the latest release, in this example, that could only be `3.0.0`.
2. (**Rebased Legacy**) `HEAD` is based off an older release of a `Legacy` release, e.g. `2.0.0`, `1.2.0` and `1.0.1` would be Rebased Legacy releases. Note that `2.1.0` and `1.2.0` would NOT be a `Rebased` release since they are the latest releases of those `major` versions.

## Additional Usage

### Dry runs

#### Dry run Install

```bash
grove install --dry-run panosoft/elm-cmd-retry panosoft/elm_parent_child_update
```

This runs the install process and stops right before installation.

#### Dry run Bump

```bash
grove bump --dry-run
```

This is EXTREMELY useful before releasing to perform all of the checks that bump normally does without actually preparing the package for a release.

### Controlling NPM

#### Silencing NPM's Output

```bash
grove install --npm-silent panosoft/elm-cmd-retry panosoft/elm_parent_child_update
```

The `--npm-silent` option will NOT display any output during the NPM install.

#### NPM Production Install

```bash
grove install --npm-production panosoft/elm-cmd-retry panosoft/elm_parent_child_update
```

The `--npm-production` option passes `-production` flag to NPM during its install operation.

#### NPM Production Uninstall

```bash
grove uninstall --npm-production panosoft/elm-websocket-server
```

The `--npm-production` option passes `-production` flag to NPM during its uninstall operation.

## Changes to `elm-package.json`

### Support for non-Github servers

In order to work within the confines of the Elm compiler while still supporting multiple sources, `Grove` stores the source locations of packages in `elm-package.json` in a key called `dependency-sources`. This makes migration from [elm-github-install](https://github.com/gdotdesign/elm-github-install) easier.

### Caveat with the `repository` key

Unfortunately, the Elm compiler dictates that the `repository` key MUST contain `github.com` even for repositories that are stored on elsewhere. It is important that your `username` or `group`, and `repo` names are correct but, for now, we have to *pretend* that the repository is on Github.

## When is `package.json` needed?

There are 2 instances where `package.json` is needed.

1. Any Elm Package (including Apps) that has Native code that uses `require` to load an **external** Node library, i.e. not **core** modules, e.g. `fs`.
2. An Application that depends on an Elm Package that meets criteria \#1 above.

Elm Packages that depend on Elm Packages that meet criteria \#1 but are not Elm Apps do **NOT** need a `package.json`.

## Code Rewriting

Normally, when you write Javascript code in Node, `require` statements will look for a `node_modules` directory under the directory where the module, which is doing the `require`, resides. If nothing is found, it will look to that module's parent directory for a `node_modules` directory. This continues all the way up the chain until the library is found or the root directory is encountered.

NPM version 2 used to create a tree of `node_modules` but since NPM version 3, all libraries are placed at the root level. The only exception is when two libraries require different versions of the same library. At that point, NPM v3 falls back to NPM v2's behavior and places the conflicting library underneath the module, which depends on it, in its own `node_modules`.

Since Elm is compiled, there is no sense of dynamic loading of modules. So all dependencies must resolve without conflicts, i.e. if Elm Package X uses Elm Package Z version 3 and Elm Package Y uses Elm Package Z version 4, then there's a conflict and there's no way to build you program without first resolving the conflict. This is why `Grove` checks for this during an install command.

To support NPM during an `install` command, `Grove` adds all dependent Elm packages that have a `package.json` to your program's `package.json` as an NPM dependency. Then `Grove` runs an `npm install` which follows the aforementioned behavior.

Things become problematic because the Elm compiler `hoists` the Native Code into the final Javascript at the **root directory**. But NPM installed the dependent packages's Javascript libraries, **not at the root, but far below that**. So when the Native Code from those dependent packages executes a `require` function, Node will start looking for that library at the **root**.

This isn't a problem if there are no conflicts among all NPM libraries. But it only takes one library conflict to cause problems.

So to solve this, `Grove` `rewrites` any `requires` that are loading a conflicting library.


Imagine the following example:

```
Your Elm Program (root)
|
+--- node_modules
     |
     +--- @gitUser
     |    |
     |    +--- elm-pack-a (Elm Package A)
     |    |
     |    +--- elm-pack-b (Elm Package B)
     |         |
     |         +--- node_modules
     |              |
     |              +--- libx (Library X v2)
     |
     +--- libx (Library X v3)
```

Native code in `Elm Package A` and `Elm Package B` will be `hoisted` to `Your Elm Program` directory by the compiler. So the `require` statements in those packages will load Javascript libraries from `Your Elm Program/node_modules` which is fine for `Elm Package A` since ***version 3*** of `Library X` happens to be there.

But that behavior is a real problem for `Elm Package B` since it needs ***version 2*** of `Library X` which  NPM put under `Elm Package B/node_modules`.

To remedy this, `Grove` targets all `require` statements in all Javascript files of `Elm Package B` that load `Library X` and **rewrites** the require statement.

For example, the following code in `Elm Package B`:

```js
	const libx = require('libx');
```

gets rewritten to:

```js
	const libx = require('./node_modules/@gitUser/elm-pack-b/node_modules/libx');
```

Now version 2 of `Library X` will be loaded for `Elm Package B`.


### Conflicts in local packages

Since local packages are linked to actual source code, Code Rewriting cannot be performed otherwise `Grove` would be modifying original source code. `Grove` will exit with an error if this is the case.

### No rewrite

If you want to resolve the `require` problem yourself through some post process, e.g. via Webpack, or some other process, then you can disable this default behavior by specifying the `--no-rewrite` option on the `install` or `uninstall` command line.

I suspect Webpack will suffer from the same problems as Node, but this option was added for maximum flexibility.

## Known issues

- Not tested on Windows - even though the code tries to be file path agnostic, I suspect that there are places that have been missed.
- Windows SSH not tested (expects `os.homedir()` to contain `.ssh/id_rsa` and `.ssh/id_rsa.pub`)
