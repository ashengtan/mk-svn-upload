const fs = require('fs')
const AdmZip = require('adm-zip')

/**
 * @description Compress file or directory
 * @return {Promise}
 */
function processCompression(context, options) {
  const { source, dest } = options || {}

  const zip = new AdmZip()
  fs.statSync(source).isFile()
    ? zip.addLocalFile(source)
    : zip.addLocalFolder(source)
  zip.writeZip(dest)
}

module.exports = processCompression
