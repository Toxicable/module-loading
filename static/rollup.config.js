export default {
  entry: './src/plugins/lazy.module.ngfactory.js',
  dest: './src/plugins/lazy.module.rollup.js',
  format: 'umd',
  moduleName: 'lazy-module',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
  }
}
