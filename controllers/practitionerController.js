const {
  isIdPresent,
  outputActivePractitioners,
  isIdAndNameValid,
} = require('../utils');
const csvToJson = require('csvtojson');
const multer = require('multer');
const upload = multer({ dest: 'tempCsv/' });
const db = require('./db');

const practitionerController = (app) => {
  app.post('/practitioners', upload.single('csvFile'), (req, res) => {
    const contentType = req.headers['content-type'].split(';')[0];

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

      if (isIdPresent(db, req.body.id)) {
        return res.status(400).send({
          status: 'error',
          message: `Id ${req.body.id} already exists`,
        });
      } else {
        db.push(practitioner);
        outputActivePractitioners(practitioner);
        return res.status(201).send({
          status: 'succes',
          message: 'practitioner added successfully',
          practitioner: practitioner,
        });
      }
    } else if (contentType === 'multipart/form-data') {
      const tempCsvFile = req.file.path;
      csvToJson()
        .fromFile(tempCsvFile)
        .then((json) => {
          if (isIdAndNameValid(json)) {
            return res.status(201).send(json);
          } else {
            return res.status(400).send({
              status: 'error',
              message: 'Different name for the same Id',
              data: json,
            });
          }
        });
    } else if (contentType === 'text/csv') {
      const tmpCSV = req.body;
      csvToJson()
        .fromString(tmpCSV)
        .then((json) => {
          if (isIdAndNameValid(json)) {
            return res.status(201).send(json);
          } else {
            return res.status(400).send({
              status: 'error',
              message: 'Different name for the same Id',
              data: json,
            });
          }
        });
    }
  });
};

module.exports = practitionerController;
