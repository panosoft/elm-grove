const _panosoft$elm_grove$Native_Git = (_ => {
	const os = require('os');
	const path = require('path');
	const git = require('nodegit');
	const rm = require('rimraf');
	const mkdirp = require('mkdirp');

	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const { toArray, fromArray } = _elm_lang$core$Native_List;

	const failure = (callback, prefix) => error => callback(fail(prefix + ' (' + error + ')'));

	const clone = url => nativeBinding(callback => {
		try {
			const fail = failure(callback, 'Unable to clone: ' + url);
			const w = '[a-zA-Z0-9]';
			const hostnameRegex = `(?:(?:${w}|${w}[a-zA-Z0-9-]*${w})\.)*(?:${w}|${w}[A-Za-z0-9-]*${w})`;
			const repoRegex = '([a-zA-Z0-9-]+)/([a-zA-Z0-9-]+)';
			const sshRegex = RegExp(`^git@${hostnameRegex}:${repoRegex}(?:\.git)?$`, 'g');
			const httpRegex = RegExp(`^https?://${hostnameRegex}/${repoRegex}(?:\.git)?$`, 'g');
			let match = sshRegex.exec(url);
			if (!match)
				match = httpRegex.exec(url);
			if (match && match[1]) {
				const cloneLocation = path.join(os.tmpdir(), match[1], match[2]);
				rm(cloneLocation, err => {
					if (err)
						callback(fail(err));
					else {
						git.Clone(url, cloneLocation, {
							fetchOpts: {
								callbacks: {
									certificateCheck: _ => 1,
									credentials: (url, username) => git.Cred.sshKeyNew(username, path.join(os.homedir(), '.ssh', 'id_rsa.pub'), path.join(os.homedir(), '.ssh', 'id_rsa'), '')
								}
							}
						})
						.then(repo => callback(succeed({repo, url, cloneLocation})))
						.catch(fail);
					}
				});
			}
			else
				fail('Invalid url');
		}
		catch (error) { fail(error); }
	});

	const initRepo = path => nativeBinding(callback => {
		const fail = failure(callback, 'Unable to init repo at: ' + path);
		try {
			git.Repository.init(path, 0)
			.then(repo => callback(succeed({repo, url: 'file://' + path})))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const getRepo = path => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get repo at: ' + path);
		try {
			git.Repository.open(path)
			.then(repo => callback(succeed({repo, url: 'file://' + path})))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const createLightweightTag = (Repo, tagName) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable create tag: ' + tagName + ' for repo: ' + Repo.url);
		try {
			Repo.repo.getHeadCommit()
			.then(commit =>
				git.Tag.createLightweight(Repo.repo, tagName, commit, 0)
				.then(tag => callback(succeed(tag)))
				.catch(fail)
			)
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const createAnnotatedTag = (Repo, tagName, message) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable create tag: ' + tagName + ' for repo: ' + Repo.url);
		try {
			Repo.repo.getHeadCommit()
			.then(commit =>
				Repo.repo.createTag(commit.id().tostrS(), tagName, message)
				.then(tag => callback(succeed(tag)))
				.catch(fail)
			)
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const getTags = Repo => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get tags for repo: ' + Repo.url);
		try {
			git.Tag.list(Repo.repo)
			.then(list => callback(succeed(fromArray(list))))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const getFileStatuses = Repo => nativeBinding(callback => {
		const filter = list => list.filter(x => x);
		Repo.repo.getStatusExt()
		.then(fileStatuses => {
			callback (succeed ({
				'conflicted': fromArray(filter(fileStatuses.map(status => status.isConflicted() ? status.path() : null))),
				'deleted': fromArray(filter(fileStatuses.map(status => status.isDeleted() ? status.path() : null))),
				'modified': fromArray(filter(fileStatuses.map(status => status.isModified() ? status.path() : null))),
				'$new': fromArray(filter(fileStatuses.map(status => status.isNew() ? status.path() : null))),
				'renamed': fromArray(filter(fileStatuses.map(status => status.isRenamed() ? status.path() : null))),
				'typeChange': fromArray(filter(fileStatuses.map(status => status.isTypechange() ? status.path() : null))),
			}));
		})
		.catch(fail);
	});

	const commit = (Repo, filesToAdd, message) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable commit to repo: ' + Repo.url);
		try {
			Repo.repo.createCommitOnHead(toArray(filesToAdd), git.Signature.default(Repo.repo), git.Signature.default(Repo.repo), message)
			.then(oid => callback(succeed(oid.tostrS())))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const checkout = (Repo, tag, targetDirectory) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable check out tag: "' + tag + '" for repo: '+ Repo.url);
		try {
			const co = commit =>
				mkdirp(targetDirectory, err =>
					err ? fail(err) :
						git.Checkout.tree(Repo.repo, commit, {
							checkoutStrategy: git.Checkout.STRATEGY.FORCE,
							targetDirectory
						}).then(_ => callback(succeed()))
						.catch(fail)
				);
			// first treat the tag as an Annotated Tag, if errors then treat as Lightweight Tag
			Repo.repo.getTagByName(tag)
			.then(co)
			// .then(oid =>  co(oid.id().toString()))
			.catch(_ =>
				Repo.repo.getReferenceCommit(tag)
				.then(co)
				.catch(fail)
			);
		}
		catch (error) { fail(error); }
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F2:false, F3:false */
	return {
		clone,
		initRepo,
		getRepo,
		createLightweightTag: F2(createLightweightTag),
		createAnnotatedTag: F3(createAnnotatedTag),
		getTags,
		getFileStatuses,
		commit: F3(commit),
		checkout: F3(checkout)
	};
})();
