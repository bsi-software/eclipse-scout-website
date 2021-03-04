/*
 * This script builds the Scout homepage. It copies static files to the /dist folder
 * and transpiles ES6 JavaScript code in ES5. The output of this build may be deployed
 * to the web server of the Scout homepage.
 *
 * IMPORTANT: you must start the express server before running the build!
 *   npm run start
 *
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * http://www.bsiag.com/
 */
const wget = require('node-wget');
const fs = require('fs');
const fse = require('fs-extra');
const babel = require('@babel/core');

const SERVER_ROOT = 'http://localhost:8080';
const DIST_DIR = './dist/';
const JS_SRC_DIR = './js/';

const PAGES = [
  {url: '/', filename: 'index.html'},
  {url: '/versions', filename: 'versions.html'},
  {url: '/features', filename: 'features.html'}
];

function exportFromExpressServer() {
  return new Promise((resolve, reject) => {
    let numExportedPages = 0;

    PAGES.forEach(page => {
      let url = SERVER_ROOT + page.url;
      let dest = DIST_DIR + page.filename;
      let pageInfo = 'url=' + page.url + ' dest=' + DIST_DIR + page.filename;

      console.log('Exporting page ' + pageInfo + '...');
      wget({
        url: url,
        dest: dest
      }, (error, response, body) => {
        if (error) {
          console.error('Failed to export ' + pageInfo, error);
          throw error;
        } else {
          console.log('Exported ' + pageInfo + ' (' + body.length + ' bytes)');
          numExportedPages++;
          if (numExportedPages === PAGES.length) {
            resolve(true);
          }
        }
      });
    });
  });
}

function copyStaticFiles() {
  console.log('Copy static files to ' + DIST_DIR + '...');
  return Promise.all([
    copy('browserconfig.xml'),
    copy('favicon.ico'),
    copy('LICENSE.txt'),
    copy('manifest.json'),
    copy('robots.txt'),
    copy('css'),
    copy('img'),
    copy('js')
  ]);

  // Shortcut for an 1:1 copy to the DIST dir
  function copy(filename) {
    return fse.copy(filename, DIST_DIR + filename);
  }
}

function transpileES6Files() {
  console.log('Transpiling ES6 files to ES5 to ' + DIST_DIR + '...');
  let srcFile = JS_SRC_DIR + 'main.js';
  let destFile = DIST_DIR + 'js/main.js'; // Overrides the existing un-transpiled file
  return babel.transformFileAsync(srcFile)
    .then(result => {
      return new Promise((resolve, reject) => {
        fs.writeFile(destFile, result.code, (error, data) => {
          resolve(true);
        });
      });
    });
}

// ---- MAIN
exportFromExpressServer()
  .then(copyStaticFiles)
  .then(transpileES6Files)
  .then(() => {
    console.log('DONE build successful!');
  });
