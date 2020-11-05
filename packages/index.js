const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const { hasOwn, error } = require('./util')
const { OptionErrorTypes, OptionKeys, TempWorkspace } = require('./enum')
const processCompression = require('./compression')

function processOption(context, program) {
  // command option
  // example: mk-svn-upload --source dist --out-name dist.zip
  const option = {}
  OptionKeys.forEach(key => hasOwn(program, key) && (option[key] = program[key]))

  // package.json config
  // example:
  // "mk-svn-upload": { "source": "dist", "outName": "dist.zip" }
  const pkgConfig = require(path.resolve(context, 'package.json'))['mk-svn-upload']

  // command option has higher priority
  return { ...(pkgConfig || {}), ...option }
}

/**
 * @description Resolve config
 */
function resolveConfig(context, config) {
  if (!config.url) {
    error(' mk-svn-upload ', 'Invalid option', OptionErrorTypes.EMPTY_URL)
    throw new Error(OptionErrorTypes.EMPTY_URL)
  }

  if (!config.source) {
    error(' mk-svn-upload ', 'Invalid option', OptionErrorTypes.EMPTY_SOURCE)
    throw new Error(OptionErrorTypes.EMPTY_SOURCE)
  } else {
    config.source = path.join(context, config.source)
    if (!fs.existsSync(config.source)) {
      const err = `path "${config.source}" no exist!`
      error(' mk-svn-upload ', 'Invalid option', err)
      throw new Error(err)
    }
  }

  if (config.compression && !config.outName) {
    error(' mk-svn-upload ', 'Invalid option', OptionErrorTypes.EMPTY_OUT_NAME)
    throw new Error(OptionErrorTypes.EMPTY_OUT_NAME)
  }

  return config
}

/**
 * @description Process program
 * @param {Context} context Current working directory
 * @param {Object} program Commander global object
 * @see https://github.com/tj/commander.js#declaring-program-variable
 */
module.exports = async function processProgram(context, program) {
  const config = resolveConfig(context, processOption(context, program))

  const workspace = path.join(context, TempWorkspace)
  shell.mkdir('-p', workspace)

  if (config.compression) {
    processCompression(context, { source: config.source, dest: path.join(workspace, config.outName) })
  }

  // TODO: upload

  shell.rm('-rf', workspace)
}
