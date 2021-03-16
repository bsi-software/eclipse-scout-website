/*
 * This script is used for local development of the Scout homepage.
 * It starts a local 'express' server.
 *
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * http://www.bsiag.com/
 */
const PORT = 8080;
const express = require('express');
const handlebars = require('express-handlebars');
const less = require('express-less');
const app = express();

/**
 * Change the version number below for a new Scout release. This will also update
 * version numbers in URLs, so the point to the correct Scout release.
 * @type {number}
 */
const SCOUT_VERSION = 11;
const SCOUT_VERSION_STRING = SCOUT_VERSION + '.0';
const GITHUB_IO_ROOT = 'https://eclipsescout.github.io/' + SCOUT_VERSION_STRING + '/';

// Handlebars Variables
app.locals = {
  scout: {
    version: SCOUT_VERSION // Used in version-button
  },
  urls: {
    bsi: {
      appContacts: 'https://scout.bsi-software.com/contacts/',
      appScoutClassicWidgets: 'https://scout.bsi-software.com/widgets/',
      appScoutJsWidgets: 'https://scout.bsi-software.com/jswidgets/',
      home: 'https://www.bsi-software.com/en',
      scoutBlog: 'https://www.bsi-software.com/en/scout-blog'
    },
    docs: {
      home: GITHUB_IO_ROOT,
      getStarted: GITHUB_IO_ROOT + 'getstarted.html',
      helloScoutClassic: GITHUB_IO_ROOT + 'helloscout.html',
      helloScoutJs: GITHUB_IO_ROOT + 'helloscout-js.html'
    },
    eclipse: {
      bugzilla: 'https://bugs.eclipse.org/bugs/buglist.cgi?bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED&bug_status=RESOLVED&bug_status=VERIFIED&columnlist=bug_id%2Cbug_severity%2Cpriority%2Ctarget_milestone%2Cbug_status%2Cresolution%2Ccomponent%2Cassigned_to%2Cshort_desc&list_id=10272285&product=Scout&query_format=advanced',
      copyrightAgent: 'http://www.eclipse.org/legal/copyright.php',
      home: 'http://www.eclipse.org/',
      legal: 'http://www.eclipse.org/legal',
      privacyPolicy: 'http://www.eclipse.org/legal/privacy.php',
      scoutForum: 'https://www.eclipse.org/forums/index.php?t=thread&frm_id=174',
      termsOfUse: 'http://www.eclipse.org/legal/termsofuse.php',
      wikipedia: 'https://de.wikipedia.org/wiki/Eclipse_Foundation'
    },
    gitHub: 'https://github.com/eclipse/scout.rt/tree/releases/' + SCOUT_VERSION_STRING + '/',
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
app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

// Pages
app.get('/', (req, res) => {
  res.render('home', {
    layout: 'index',
    title: 'Eclipse Scout - A one-stop framework to develop professional business applications',
    home: true
  });
});
app.get('/features.html', (req, res) => {
  res.render('features', {
    title: 'Why you will love Eclipse Scout',
    layout: 'index'
  });
});
app.get('/versions.html', (req, res) => {
  res.render('versions', {
    title: 'Eclipse Scout Versions',
    layout: 'index'
  });
});

// Launch Server
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
