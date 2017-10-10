const _panosoft$elm_grove$Native_Env = (_ => {
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const env = JSON.stringify(process.env);
	const homedir = require('os').homedir();

	return {
		env,
		homedir
	};
})();
