/*
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * http://www.bsiag.com/
 */
const express = require('express'); // Creates our express server
const handlebars = require('express-handlebars');
const less = require('express-less');
const app = express();
const port = 8080; // Serves static files (we need it to import a css file)

app.locals = {
  scout: {
    version: 11
  },
  urls: {
    bsi: {
      appContacts: 'https://scout.bsi-software.com/contacts/',
      appScoutJsWidgets: 'https://scout.bsi-software.com/jswidgets/',
      appScoutClassicWidgets: 'https://scout.bsi-software.com/widgets/'
    },
    eclipse: {
      home: 'http://www.eclipse.org/',
      privacyPolicy: 'http://www.eclipse.org/legal/privacy.php',
      termsOfUse: 'http://www.eclipse.org/legal/termsofuse.php',
      copyrightAgent: 'http://www.eclipse.org/legal/copyright.php',
      legal: 'http://www.eclipse.org/legal'
    }
  }
};

// Set-up handlebars engine
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));

app.use('/css', less(__dirname + '/css', {debug: true}));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', (req, res) => {
  // Serves the body of the page aka "main.hbs" to the container aka "index.hbs"
  res.render('main', {layout: 'index'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));
