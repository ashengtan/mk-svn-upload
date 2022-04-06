# svn-upload

> A Node.js custom command-line tool that help you to upload file/directory to svn repository.

## Documentation

```javascript
Usage: svn-upload [options] [entry]

upload file/directoru to svn repository

Options:
  -u, --url <url>                  svn repository url
  -s, --source <source>            source path for file/directory that uploaded to svn repository
  -o, --out-name [name]            rename the file/directory that uploaded to svn repository or not, empty means not to
  -c, --compression [compression]  compression type for the file/directory that uploaded to svn repository, empty means not to
  -nc, --no-compression            not to compress the file/directory that uploaded to svn repository, default set to false
```

**Note:** The compression type only support `zip` at present.

**Note:** If the option `--no-compression` set to `true`, the option `compression` would be ignored.

Also, you can configure it by the `package.json`:

```json
"svn-upload": {
  "url": "svn://example.com",
  "source": "dist",
  "compression": "zip"
},
"scripts": {
  "svn": "svn-upload -o b.zip",
}
```

And then run:

```shell
npm run svn
```

That would compress the directory `dist` to `b.zip` and upload to svn repository.

**Note:** command option has higher priority than `package.json` configuration.
