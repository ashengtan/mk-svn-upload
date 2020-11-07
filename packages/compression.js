const fs = require('fs')
const AdmZip = require('adm-zip')
const { error } = require('./util')
const { pkgName } = require('./enum')

/**
 * @description Compress file or directory
 * @return {Promise}
 */
function processCompression(context, options) {
  const { source, dest } = options || {}

  try {
    const zip = new AdmZip()
    fs.statSync(source).isFile()
      ? zip.addLocalFile(source)
      : zip.addLocalFolder(source)
    zip.writeZip(dest)
  } catch (err) {
    error(` ${pkgName} `, 'Compressed fail', `Compressed "${source}" fail`)
    throw err
  }
}

module.exports = processCompression
