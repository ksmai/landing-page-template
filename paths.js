const path = require('path');

const src = path.resolve(__dirname, 'src');
const docs = path.resolve(__dirname, 'docs');
const assets = path.resolve(__dirname, 'assets');
const tsconfig = path.resolve(__dirname, 'tsconfig.json');
const publicPath = '/landing-page-template/';

const index = path.join(src, 'index.html');
const main = path.join(src, 'main.ts');
const polyfills = path.join(src, 'polyfills.ts');
const app = path.join(src, 'app');
const styles = path.join(src, 'styles');
const favicon = path.join(assets, 'favicon.svg');

const appModule = path.join(app, 'app.module#AppModule');

module.exports = {
  src,
  docs,
  assets,
  tsconfig,
  publicPath,
  index,
  main,
  polyfills,
  app,
  styles,
  favicon,
  appModule,
};
