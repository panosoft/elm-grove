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

##### Features
* Changed default license for Init command from `BSD` to `BSD-3-Clause`

##### Fixes
* Github sources were being added to `dependency-sources`
* Fixed install/update instructions in the readme
