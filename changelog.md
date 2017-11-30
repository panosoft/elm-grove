1.0.3 / 2017-09-27
==================

* Initial release

1.0.4 / 2017-10-04
==================

##### Features
* Documenation updated to include WARNING
* Roadmap added to docs
* Better commit message during a Bump command
* Removed skipping NPM install message during uninstall

##### Fixes
* Init command adds `.git` to repository field in `elm-package.json`
* Init will NOT run if `elm-package.json` already exists

1.0.5 / 2017-10-04
==================

##### Fixes
* Forgot the update instructions in the readme

1.0.6 / 2017-10-10
==================

##### Features
* Configuration command to run in safe mode to only install Official Elm Packages (local and global configurations)
* Init command prompts to create minimal `package.json`

##### Changes
* Changed default license for Init command from `BSD` to `BSD-3-Clause`

##### Fixes
* Github sources were being added to `dependency-sources`
* Fixed install/update instructions in the readme

1.1.0 / 2017-10-16
==================

##### Features
* Config command now supports `--docs`
* New command `docs` will generate Elm docs
* If configured, the `bump` command will generate Elm docs into `elm-docs`
* Added `--link` to the `uninstall` command since uninstall does a reinstall and the reinstall will use this flag

##### Fixes
* `version` command was reading from the current directory not the Grove directory
* Added missing documentation for 1.0.6 features
* Changed `file:\\` to `git+file:\\` for npm dependencies that are locally linked so npm will install from the directory instead of just linking to it
* Don't add semver to linked npm dependencies

1.1.1 / 2017-10-31
==================

##### Fixes
* Fixed bug ([issue #8](https://github.com/panosoft/elm-grove/issues/8)) when installing via SSH from github.com


1.2.0 / 2017-11-08
==================

##### Features
* Enforces Semantic Versioning - Bump will determine proper version based on changes to public interface
* Normal, Rebased and Legacy release support

##### Changes
* `documentation.json` is now generated in current directory for tools, e.g. [elmjitsu](https://atom.io/packages/elmjutsu)
* `grove-config.json` is now `.grove-config.json` (automatically renamed when you run Grove)

##### Fixes
* 3rd party `package.json` files are no longer held to the same standards as the ones for the current project's
	* Validation errors are just Warnings
	* Validation is only done if 3rd party package has `nativeModules`
* Elm packages are only included in your `package.json` if the package has `nativeModules`
* Init command's validation of repo names didn't allow for numbers
* `grove init` followed directly by a `grove install <some-package>` would NOT update `package.json` with dependencies if `<some-package>` had dependencies


1.2.1 / 2017-11-15
==================

##### Fixes
* Fixed issue \#12 where the `package-lock.json` file wasn't being updated during `bump`
* Fixed bug where `package.json` was being read from the master branch instead the checked out version. This was only an issue when a newer version of a library existed that has Native code
* Updated to latest version of `panosoft/elm-docs` which fixed bug with Table of Contents generation and duplicate entries


1.2.2 / 2017-11-21
==================

##### Changes
* Use newer version of `elm-docs` which uses the source code signatures instead of `documentation.json` signatures which are not formatted


1.2.3 / 2017-11-30
==================

##### Fixes
* Use newer version of `elm-docs` which fixes [elm-docs Issue \#2](https://github.com/panosoft/elm-docs/issues/2)
