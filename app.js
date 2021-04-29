const express = require('express');
const csv = require('fast-csv');
const practitionerController = require('./controllers/practitionerController');
const port = 9999;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text({ type: 'text/csv' }));
app.set('port', port);

practitionerController(app);

app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));

module.exports = app;
