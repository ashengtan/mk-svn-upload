const chalk = require('chalk')

const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(target, key) {
  return hasOwnProperty.call(target, key)
}

const log = console.log

function info(title, hint) {
  log(`${chalk.bgBlue.black(title)} ${hint}`)
}

function success(title, hint) {
  log(`${chalk.bgGreen.black(title)} ${hint}`)
}

function error(title, prefix, hint) {
  log(`${chalk.bgRed.black(`${title || 'Error'}`)} ${hint ? `${prefix}: ${hint}` : `${prefix}`}`)
}

exports.hasOwn = hasOwn
exports.log = log
exports.info = info
exports.success = success
exports.error = error
