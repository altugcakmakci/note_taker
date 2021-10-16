const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const deleteRecord = (delId, file) => {
  console.log("Delete");
  console.log(delId);
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let newData = [];
      const parsedData = JSON.parse(data);
      for(let i=0;i<parsedData.length;i++){
        console.log(parsedData[i]);
        if (parsedData[i].id!=delId){
          newData.push(parsedData[i]);
          console.log("pushed");
        }
      }
      console.log(newData);
      writeToFile(file, newData);
    }
  });
};

const sortRecords = (records, file) => {
  console.log("Sort");
  console.log(records);
  writeToFile(file, records);
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteRecord, sortRecords };
