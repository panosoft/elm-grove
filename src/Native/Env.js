const _panosoft$elm_grove$Native_Env = (_ => {
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const env = JSON.stringify(process.env);
	const homedir = require('os').homedir();
	const tmpdir = require('os').tmpdir();

	return {
		env,
		homedir,
		tmpdir
	};
})();
