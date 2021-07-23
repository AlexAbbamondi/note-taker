//required modules
const fs = require("fs");
const router = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//db route path
const dbPath = './db/db.json';

//GET route to get the data from db.json
router.get("/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile(dbPath).then((data) => res.json(JSON.parse(data)));
})

//POST route to take what was inputted in the title and text area and give it a random id --- then it is appended to db.json
router.post("/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    const { title, text, id } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, dbPath);
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding a note');
    }
})

//DELETE route grabs the data, parses it, filters through it to grab all the ones besides the one being deleted then writes a new file 
//with the remaining notes and refreshes the page
router.delete("/notes/:id", (req, res) => {
  let data = fs.readFileSync(dbPath);
  let notes = JSON.parse(data);
  const filteredNotes = notes.filter(item => item.id != req.params.id)
  writeToFile(dbPath, filteredNotes);
  res.json({ success: true });
})

module.exports = router;