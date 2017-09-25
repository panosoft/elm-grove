const _panosoft$elm_grove$Native_Glob = (_ => {
	const glob = require('glob');
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const { fromArray } = _elm_lang$core$Native_List;
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const isNothing = (v => v.ctor == 'Nothing');
	const find = (pattern, ignore, follow) => nativeBinding(callback => {
		try {
			ignore =isNothing(ignore) ? null : ignore._0;
			glob(pattern, {ignore, follow}, (err, matches) => callback(err ? fail(err) : succeed(fromArray(matches))));
		}
		catch (error) { fail(error); }
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F3:false */
	return {
		find: F3(find)
	};
})();
