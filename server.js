/*
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * http://www.bsiag.com/
 */
const PORT = 8080;
const express = require('express');
const handlebars = require('express-handlebars');
const less = require('express-less');
const app = express();

// Handlebars Variables
app.locals = {
  scout: {
    version: 11
  },
  urls: {
    bsi: {
      home: 'https://scout.bsi-software.com/',
      appContacts: 'https://scout.bsi-software.com/contacts/',
      appScoutJsWidgets: 'https://scout.bsi-software.com/jswidgets/',
      appScoutClassicWidgets: 'https://scout.bsi-software.com/widgets/',
      scoutBlog: 'https://www.bsi-software.com/en/scout-blog'
    },
    eclipse: {
      home: 'http://www.eclipse.org/',
      privacyPolicy: 'http://www.eclipse.org/legal/privacy.php',
      termsOfUse: 'http://www.eclipse.org/legal/termsofuse.php',
      copyrightAgent: 'http://www.eclipse.org/legal/copyright.php',
      legal: 'http://www.eclipse.org/legal',
      wikipedia: 'https://de.wikipedia.org/wiki/Eclipse_Foundation'
    },
    gitHub: 'https://github.com/eclipse/scout.rt',
    stackOverflow: 'https://stackoverflow.com/tags/eclipse-scout'
  }
};

// Set-up handlebars engine
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));

// Less Compiler
app.use('/css', less(__dirname + '/css', {debug: true}));

// Static Resources
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

// Pages
app.get('/', (req, res) => {
  res.render('home', {layout: 'index'});
});
app.get('/about', (req, res) => {
  res.render('about', {layout: 'index'});
});
app.get('/versions', (req, res) => {
  res.render('versions', {layout: 'index'});
});

// Launch Server
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
