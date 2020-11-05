#!/usr/bin/env node

const { program } = require('commander')
const processProgram = require('../packages')

program
  .version(`mk-svn-upload ${require('../package').version}`)
  .description('Upload file/directory to svn repository')
  .option('-u, --url <url>', 'svn repository address of the server')
  .option('-s, --source <source>', 'source path for file/directory that uploaded to svn repository')
  .option('-d, --dest [dir]', 'target path for svn repository that file/directory to upload, empty means root directory')
  .option('-o, --out-name [name]', 'rename the file/directory that uploaded to svn repository or not, empty means not to, necessary with compression')
  .option('-c, --compression [compression]', 'whether to compress the file/directory into a zip file, empty means not to')

program.parse(process.argv)

processProgram(process.cwd(), program)
