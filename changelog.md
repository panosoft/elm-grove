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
