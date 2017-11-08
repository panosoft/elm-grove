const _panosoft$elm_grove$Native_Git = (_ => {
	const os = require('os');
	const path = require('path');
	const git = require('nodegit');
	const rm = require('rimraf');
	const mkdirp = require('mkdirp');

	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const { toArray, fromArray } = _elm_lang$core$Native_List;
	/* global _elm_lang$core$Result$Err:false _elm_lang$core$Result$Ok:false */
	const Err = _elm_lang$core$Result$Err;
	const Ok = _elm_lang$core$Result$Ok;

	const failure = (callback, prefix) => error => callback(fail(prefix + ' (' + error + ')'));
	const failureResult = prefix => error => Err(prefix + '(' + error + ')');

	const clone = (url, destinationPath) => nativeBinding(callback => {
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
				const cloneLocation = path.join(destinationPath, match[1], match[2]);
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

	const commit = (Repo, filesToAdd, filesToDelete, message) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable commit to repo: ' + Repo.url);
		try {
			let _index;
			Repo.repo.refreshIndex()
			.then (index => _index = index)
			.then (_ => toArray(filesToAdd).reduce( (lastFilePromise, path) => lastFilePromise .then(_ => _index.addByPath(path)), Promise.resolve()))
			.then (_ => toArray(filesToDelete).reduce( (lastFilePromise, path) => lastFilePromise .then(_ => _index.removeByPath(path)), Promise.resolve()))
			.then (_ => _index.write())
			.then (_ => _index.writeTree())
			.then(treeOid =>
				Repo.repo.getHeadCommit()
				.then (parent =>
					Repo.repo.createCommit('HEAD', git.Signature.default(Repo.repo), git.Signature.default(Repo.repo), message, treeOid, parent ? [parent] : parent)
					.then(oid => callback(succeed(oid.tostrS())))
				)
			)
			.catch(fail);
		}
		catch (error) { fail(error); }
	});
	const checkoutInternal = (fail, callback) => (Repo, commit, targetDirectory) =>
		mkdirp(targetDirectory, err =>
			err ? fail(err) :
				git.Checkout.tree(Repo.repo, commit, {
					checkoutStrategy: git.Checkout.STRATEGY.FORCE | git.Checkout.STRATEGY.DONT_UPDATE_INDEX,
					targetDirectory
				}).then(_ => callback(succeed()))
				.catch(fail)
		);
	const checkoutCommit = (Repo, commit, targetDirectory) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable to checkout commit: "' + commit + '" for repo: '+ Repo.url);
		try {
			checkoutInternal(fail, callback)(Repo, commit, targetDirectory);
		}
		catch (error) { fail(error); }
	});
	const checkout = (Repo, tag, targetDirectory) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable to checkout tag: "' + tag + '" for repo: '+ Repo.url);
		try {
			const co = checkoutInternal(fail, callback);
			// first treat the tag as an Annotated Tag, if errors then treat as Lightweight Tag
			Repo.repo.getTagByName(tag)
			.then(commit => co(Repo, commit, targetDirectory))
			// .then(oid =>  co(oid.id().toString()))
			.catch(_ =>
				Repo.repo.getReferenceCommit(tag)
				.then(commit => co(Repo, commit, targetDirectory))
				.catch(fail)
			);
		}
		catch (error) { fail(error); }
	});
	const getMasterCommit = Repo => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get Master commit: for repo: '+ Repo.url);
		try {
			Repo.repo.getMasterCommit()
			.then(commit => callback(succeed(commit)))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});
	const getHeadCommit = Repo => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get Head commit: for repo: '+ Repo.url);
		try {
			Repo.repo.getHeadCommit()
			.then(commit => callback(succeed(commit)))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});
	const getCommitTagHistory = (Repo, commit) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get Tag Commit History for Commit: ' + commit + ' for repo: '+ Repo.url);
		try {
			if (!commit)
				callback(succeed(fromArray([])));
			else {
				const history = commit.history(git.Revwalk.SORT.Time);
				history.on('end', commits => {
					try {
						callback(succeed(fromArray(commits)));
					}
					catch (error) { fail(error); }
				});
				history.start();
			}
		}
		catch (error) { fail(error); }
	});
	const getCommitSha = commit => {
		const fail = failureResult('Unable get SHA for Commit: ' + commit);
		try {
			return Ok(commit.sha());
		}
		catch (error) { return fail(error); }
	};
	const getTagShas = (Repo, tagList) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get Tag Shas for Tags: ' + toArray(tagList) + ' for repo: '+ Repo.url);
		try {
			const tags = toArray(tagList);
			Promise.all(
				tags.map(tagName =>
					git.Reference.lookup(Repo.repo, `refs/tags/${tagName}`)
					// This resolves the tag (annotated or not) to a commit ref
					.then(ref => ref.peel(git.Object.TYPE.COMMIT))
					.then(ref => git.Commit.lookup(Repo.repo, ref.id()))
					.then(commit => ({
						tagName: tagName,
						sha: commit.sha()
					}))
					.catch(fail)
				)
			)
			.then (tagCommits => callback(succeed(tagCommits)))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F2:false, F3:false, F4:false */
	return {
		clone: F2(clone),
		initRepo,
		getRepo,
		createLightweightTag: F2(createLightweightTag),
		createAnnotatedTag: F3(createAnnotatedTag),
		getTags,
		getFileStatuses,
		commit: F4(commit),
		checkoutCommit: F3(checkoutCommit),
		checkout: F3(checkout),
		getMasterCommit,
		getHeadCommit,
		getCommitTagHistory: F2(getCommitTagHistory),
		getCommitSha,
		getTagShas: F2(getTagShas)
	};
})();
