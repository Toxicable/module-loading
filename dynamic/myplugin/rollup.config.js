let metadata = require('./.plugin-metadata.json')

export default {
  entry: './aot/aot/src/app/plugin.module.ngfactory.js',
  dest: '../bundled-plugins/' + metadata.name + '/plugin-factory.umd.js',
  format: 'umd',
  moduleName: metadata.name,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
  }
}
