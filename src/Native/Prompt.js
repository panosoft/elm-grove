const _panosoft$elm_grove$Native_Prompt = (_ => {
	const prompt = require('prompt');
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const isNothing = (v => v.ctor == 'Nothing');
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const doPrompt = (promptOptions) => nativeBinding(callback => {
		try {
			prompt.message = '';
			prompt.start();
			const schema = {
				properties: {
					response: {
						description: promptOptions.prompt,
						pattern: isNothing(promptOptions.pattern) ? /./ : promptOptions.pattern._0,
						message: isNothing(promptOptions.message) ? null : promptOptions.message._0,
						required: promptOptions.required
					}
				}
			};
			prompt.get(schema, (err, result) => callback(
				err
					? fail(err.message)
					: succeed(result.response == '' && !isNothing(promptOptions.$default) ? promptOptions.$default._0 : result.response))
			);
		}
		catch (error) {callback(fail(error));}
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	return {
		prompt: doPrompt
	};
})();
