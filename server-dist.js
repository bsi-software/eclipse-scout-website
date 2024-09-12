/*
 * This script is used to test the static homepage in the /dist
 * folder, after it has been exported by build.js.
 *
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * http://www.bsiag.com/
 */
const PORT = 8096;
const ROOT_DIR = '/scout/';
const express = require('express');
const app = express();

app.use(ROOT_DIR, express.static(__dirname + '/dist'));

// Launch Server
app.listen(PORT, () => {
  console.log('Serving files from /dist directory');
  console.log('http://localhost:' + PORT + ROOT_DIR);
});
