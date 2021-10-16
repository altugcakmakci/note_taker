const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteRecord, sortRecords } = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  const { title, text, id } = req.body;

  if (req.body) {
    const newRecord = {
      title,
      text,
      id
    };

    readAndAppend(newRecord, './db/db.json');
    res.json(`New record added successfully 🚀`);
  } else {
    res.error('Error in adding new record');
  }
});

notes.delete('/:id', (req, res) => {
    let delId = req.params.id.split(':')[1];
  
    deleteRecord(delId, './db/db.json');
    res.json(`Record deleted successfully 🚀`);

  });

notes.post('/sort', (req, res) => {
    sortRecords(req.body,'./db/db.json');
    res.json(`Records sorted successfully 🚀`);
  });

module.exports = notes;
