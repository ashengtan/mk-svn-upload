const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
// const { processProgram, resolveConfig } = require('./util')
// const processCompression = require('./compression')
const { hasOwn, log, error } = require('./util')
const { OptionErrorTypes, CompressionTypes } = require('./enum')

// const context = process.cwd()

/**
 * @description parse commander option
 */
// async function processOption(program) {
//   const pkgConfigs = require(path.resolve(context, 'package.json'))['mk-svn-upload']

//   const options = resolveConfig(context, processProgram(program, 'option'), pkgConfigs)

//   if (options) {
//     const { url, path, dest, compression, outName } = options

//     let finalPath = path
//     if (compression) {
//       if (!outName) {
//         console.error(`${chalk.bgRed.black(' Error ')}: Must provide \`outName\` when compressing`)
//       }
//       await processCompression(context, {
//         src: path,
//         dest: 'compression-workspace',
//         filename: outName,
//         type: compression
//       })
//       finalPath = `${path}.${compression}`
//     }
//   }
//   // console.log('--- options ---')
//   // console.log(options)
//   // console.log('--- parseOption ---')
//   // console.log(`-u, --url: ${url}`)
//   // console.log(`-p, --path: ${path}`)
//   // console.log(`-d, --dest: ${dest}`)
//   // console.log(`-o, --out-name: ${outName}`)
//   // console.log(`-c, --compression: ${compression}`)
//   // console.log(`-conf, --config: ${config}`)
//   // TODO: check option
//   // execute option
// }

// module.exports = processOption

const OptionKeys = [
  'url',
  'path',
  'dest',
  'outName',
  'compression'
]
function processOption(context, program) {
  // command option
  // example: mk-svn-upload --path dist --out-name dist.zip
  const option = {}
  OptionKeys.forEach(key => hasOwn(program, key) && (option[key] = program[key]))

  // package.json config
  // example:
  // "mk-svn-upload": { "path": "dist", "outName": "dist.zip" }
  const pkgConfig = require(path.resolve(context, 'package.json'))['mk-svn-upload']

  // command option has higher priority
  return { ...(pkgConfig || {}), ...option }
}

/**
 * @description Resolve config
 */
function resolveConfig(context, config) {
  if (!config.url) {
    error(' mk-svn-upload ', OptionErrorTypes.URL_EMPTY)
    throw new Error(OptionErrorTypes.URL_EMPTY)
  }

  if (!config.path) {
    error(' mk-svn-upload ', OptionErrorTypes.PATH_EMPTY)
    throw new Error(OptionErrorTypes.PATH_EMPTY)
  } else {
    config.path = path.join(context, config.path)
    if (!fs.existsSync(config.path)) {
      const pathNoExistHint = `path "${config.path}" no exist!`
      error(' mk-svn-upload ', pathNoExistHint)
      throw new Error(pathNoExistHint)
    }
  }

  if (config.compression) {
    if (!CompressionTypes.includes(config.compression)) {
      const noSupportHint = `not support compression type: "${config.compression}", "${CompressionTypes.join('", "')}" are supported.`
      error(' mk-svn-upload ', noSupportHint)
      throw new Error(noSupportHint)
    }

    if (!config.outName) {
      error(' mk-svn-upload ', OptionErrorTypes.OUT_NAME_EMPTY)
      throw new Error(OptionErrorTypes.OUT_NAME_EMPTY)
    }
  }

  return config
}

/**
 * @description Process program
 * @param {Context} context Current working directory
 * @param {Object} program Commander global object
 * @see https://github.com/tj/commander.js#declaring-program-variable
 */
module.exports = function processProgram(context, program) {
  const option = processOption(context, program)
  const config = resolveConfig(context, option)
  // TODO: compress
  // TODO: upload
}
