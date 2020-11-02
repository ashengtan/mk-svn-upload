#!/usr/bin/env node

const { program } = require('commander')
const processProgram = require('../packages')

program
  .version(`mk-svn-upload ${require('../package').version}`)
  .description('Upload file/directory to svn repository')
  .option('-u, --url <url>', 'svn repository address of the server')
  .option('-p, --path <path>', 'path for file/directory that uploaded to svn repository')
  .option('-d, --dest [dir]', 'target path for svn repository that file/directory to upload, empty means root directory')
  .option('-o, --out-name [name]', 'rename the file/directory that uploaded to svn repository or not, empty means not to, necessary with compression')
  .option('-c, --compression [compression]', 'compression type of file/directory (support: tar, tgz, zip), empty means not to compress')

program.parse(process.argv)

processProgram(process.cwd(), program)
