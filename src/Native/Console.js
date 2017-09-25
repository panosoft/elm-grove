const _panosoft$elm_grove$Native_Console = (_ => {
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const log = msg => nativeBinding(callback => {
		/*eslint no-control-regex: "off"*/
		const displayMsg = process.stdout.isTTY ? msg : msg.replace(/\x1B\[\d+?m/g, '');
		console.log(displayMsg);
		callback(succeed(msg));
	});

	return {
		log
	};
})();
