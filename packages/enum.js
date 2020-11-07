exports.OptionErrorTypes = {
  EMPTY_URL: 'option `url` is undefined!',
  EMPTY_SOURCE: 'option `source` is undefined!',
  EMPTY_OUT_NAME: 'option `outName` is necessary if option `compression` is true!'
}

exports.OptionKeys = [
  'url',
  'source',
  'dest',
  'outName',
  'compression'
]

exports.pkgName = require('../package.json').name

exports.WorkspaceName = `${exports.pkgName}-workspace`

