#!/usr/bin/env node

const { program } = require('commander')
const processProgram = require('../packages')
const { pkgName } = require('../packages/enum')

program
  .version(`${pkgName} ${require('../package').version}`)
  .description('Upload file/directory to svn repository')
  .option('-u, --url <url>', 'svn repository address')
  .option('-s, --source <source>', 'source path for file/directory that uploaded to svn repository')
  .option('-o, --out-name [name]', 'rename the file/directory that uploaded to svn repository or not, empty means not to, necessary with compression')
  .option('-c, --compression [compression]', 'compression type for the file/directory that uploaded to svn repository, empty means not to')
  .option('-nc, --no-compression', 'not to compress the file/directory that uploaded to svn repository', false)

program.parse(process.argv)

processProgram(process.cwd(), program)
