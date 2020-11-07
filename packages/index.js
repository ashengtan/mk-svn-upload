const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const { hasOwn, log, info, success, error } = require('./util')
const { OptionErrorTypes, OptionKeys, WorkspaceName, pkgName } = require('./enum')
const processCompression = require('./compression')
const upload = require('./svn')

function processOption(context, program) {
  // command option
  // example: mk-svn-upload --source dist --out-name dist.zip
  const option = {}
  OptionKeys.forEach(key => hasOwn(program, key) && (option[key] = program[key]))

  // package.json config
  // example:
  // "mk-svn-upload": { "source": "dist", "outName": "dist.zip" }
  const pkgConfig = require(path.resolve(context, 'package.json'))[pkgName]

  // command option has higher priority
  const mergeConfig = { ...(pkgConfig || {}), ...option }

  // if the option `--no-compression` set to `true`, the option `compression` would be ignored
  return { ...mergeConfig, compression: mergeConfig.noCompression ? '' : mergeConfig.compression }
}

/**
 * @description Resolve config
 */
function resolveConfig(context, config) {
  if (!config.url) {
    error(` ${pkgName} `, 'Invalid option', OptionErrorTypes.EMPTY_URL)
    throw new Error(OptionErrorTypes.EMPTY_URL)
  }

  if (!config.source) {
    error(` ${pkgName} `, 'Invalid option', OptionErrorTypes.EMPTY_SOURCE)
    throw new Error(OptionErrorTypes.EMPTY_SOURCE)
  } else {
    config.source = path.join(context, config.source)
    if (!fs.existsSync(config.source)) {
      const err = `path "${config.source}" no exist!`
      error(` ${pkgName} `, 'Invalid option', err)
      throw new Error(err)
    }
  }

  // rename source file/directory while option `outName` is empty
  if (!config.outName) {
    config.outName = path.parse(config.source).name
  }

  return config
}

/**
 * @description Process program
 * @param {Context} context Current working directory
 * @param {Object} program Commander global object
 * @see https://github.com/tj/commander.js#declaring-program-variable
 */
function processProgram(context, program) {
  const { url, source, outName, compression } = resolveConfig(context, processOption(context, program))
  const workspace = path.join(context, WorkspaceName)

  info(` ${pkgName} `, 'Running...')

  try {
    shell.mkdir('-p', workspace)
  } catch (err) {
    error(` ${pkgName} `, 'Created workspace fail', `Created "${workspace}" fail`)
    throw err
  }

  if (compression) {
    processCompression(context, { source, dest: path.join(workspace, outName) })
  } else {
    const dest = path.join(workspace, outName)
    try {
      shell.cp('-fr', source, dest)
    } catch (err) {
      error(` ${pkgName} `, 'Copied fail', `Copied "${source}" to "${dest}" fail`)
      throw err
    }
  }

  upload({ url, source: workspace, outName })

  shell.rm('-rf', workspace)

  success(` ${pkgName} `, `Uploaded success: "${url}/${outName}"`)
}

module.exports = processProgram
