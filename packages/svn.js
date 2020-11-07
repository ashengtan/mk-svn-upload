const shell = require('shelljs')
const { error } = require('./util')
const { pkgName } = require('./enum')

/**
 * @description Delete SVN source
 * @param {string} url source url
 */
function deleteSVNSource(url) {
  try {
    shell.exec(`svn delete -m "Delete source by ${pkgName}" ${url}`)
  } catch (err) {
    error(` ${pkgName} `, 'Uploaded fail', `Deleted "${url}" fail`)
    throw err
  }
}

/**
 * @description Import SVN source
 * @param {string} url SVN repository url
 * @param {string} source the file/directory path that uploaded to SVN repository
 */
function importSVNSource(url, source) {
  try {
    shell.exec(`svn import -m "Import source by ${pkgName}" ${source} ${url}`)
  } catch (err) {
    error(` ${pkgName} `, 'Uploaded fail', `Imported "${source}" to "${url}" fail`)
    throw err
  }
}

/**
 * @description Upload file/directory to SVN repository
 * @param {Object} options
 * @prop {string} options.url SVN repository url
 * @prop {string} options.source the file/directory path that uploaded to SVN repository
 * @prop {string} options.outName SVN source path on SVN repository
 */
function upload(options) {
  const { url, source, outName } = options || {}
  deleteSVNSource(`${url}/${outName}`)
  importSVNSource(url, source)
}

module.exports = upload
