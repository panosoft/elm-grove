const _panosoft$elm_grove$Native_Spawn = (_ => {
	const { spawn } = require('child_process');
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const exec = (cmdLine, successExitCode, silent) => nativeBinding(callback => {
		try {
			const cmdLineParts = cmdLine.split(' ');
			const cmd = spawn(cmdLineParts[0], cmdLineParts.slice(1, cmdLineParts.length), {shell: true});
			if (!silent) {
				cmd.stdout.on('data', data => process.stdout.write(data.toString()));
				cmd.stderr.on('data', data => process.stderr.write(data.toString()));
			}
			cmd.on('exit', exitCode => callback(exitCode == successExitCode ? succeed() : fail(Error(`Exited with error code: ${exitCode}`))));
		}
		catch (error) {callback(fail(error));}
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F3:false */
	return {
		exec: F3(exec)
	};
})();
