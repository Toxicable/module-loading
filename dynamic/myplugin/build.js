var exec = require('child_process').execSync;
var fs = require('fs');
var metadata = require('./.plugin-metadata.json');

log('cleaning')
exec('npm run clean');

log('ngc')
var ngc = exec('npm run ngc')//.stderr.pipe(process.stderr);

log('tsc')
var tsc = exec('npm run tsc')//.stderr.pipe(process.stderr);

log('rollup')
var rollup = exec('npm run rollup')//.stderr.pipe(process.stderr);

log('copying metadata')
fs.createReadStream('.plugin-metadata.json')
  .pipe(fs.createWriteStream('../bundled-plugins/'+ metadata.name + '/.plugin-metadata.json'));

function log(msg){
  console.log(msg);
}
