const express = require('express');
const csvtojson = require('csvtojson');
const port = 9999;
const db = [];

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', port);

app.post('/practitioners', (req, res) => {
  const contentType = req.headers['content-type'];

  if (contentType === 'application/json') {
    if (!req.body.id) {
      return res.status(400).send({
        status: 'error',
        message: 'Id is required',
      });
    } else if (req.body.resourceType !== 'Practitioner') {
      return res.status(400).send({
        status: 'error',
        message: `Resource type ${req.body.resourceType} is invalid. Resource type should be Practitioner`,
      });
    }
    const practitioner = req.body;

    const isIdPresent = db.find(
      (practitioner) => practitioner.id === req.body.id
    );

    if (isIdPresent) {
      return res.status(400).send({
        status: 'error',
        message: `Id ${req.body.id} already exists`,
      });
    } else {
      db.push(practitioner);
      if (practitioner.active) {
        console.log('Name: ' + JSON.stringify(practitioner.name[0]));
        practitioner.facility.map((facility) => {
          console.log('Facility: ' + JSON.stringify(facility));
        });
      }
      return res.status(201).send({
        status: 'succes',
        message: 'practitioner added successfully',
        practitioner: practitioner,
      });
    }
  } else if (contentType === 'text/csv') {
    console.log(req.body);
    res.send(req);
  }
  console.log(req.headers['content-type']);
});

app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));

module.exports = app;
