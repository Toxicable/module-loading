export default {
  entry: './aot/src/app/plugin.module.ngfactory.js',
  dest: './aot/bundles/plugin-module.umd.js',
  format: 'umd',
  moduleName: 'plugin-module',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
  }
}
