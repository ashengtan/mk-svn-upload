const fs = require('fs')
const path = require('path')
const compressing = require('compressing')
const chalk = require('chalk')

const SupportTypes = ['zip', 'tar', 'taz']

/**
 * @description Process compression error
 */
function processCompressError(error) {
  console.error(`${chalk.bgRed.black(' Error ')}: Compress error`)
  throw error
}

/**
 * @description Compress a single file
 * @see https://github.com/node-modules/compressing#compress-a-single-file
 * @param {string} src source file
 * @param {string} dest destination path
 * @return {Promise}
 */
function compressFile(src, dest, type) {
  return compressing[type].compressFile(src, dest).catch(error => processCompressError(error))
}

/**
 * @description Compress a dir
 * @see https://github.com/node-modules/compressing#compress-a-dir
 * @return {Promise}
 */
function compressDir(src, dest, type) {
  return compressing[type].compressDir(src, dest).catch(error => processCompressError(error))
}

/**
 * @description Compress file or directory
 * @return {Promise}
 */
function processCompression(context, options) {
  let { src, dest, filename, type } = options || {}
  if (!SupportTypes.includes(type)) {
    console.error(`${chalk.bgRed.black(' Error ')}: Not support type: "${type}", ${SupportTypes.join(', ')} are supported.`)
    return
  }

  const finalOptions = {
    src,
    dest: path.resolve(context, dest, `${filename}.${type}`),
    type
  }

  return fs.statSync(src).isFile()
    ? compressFile(...finalOptions)
    : compressDir(...finalOptions)
}

exports.processCompression = processCompression
