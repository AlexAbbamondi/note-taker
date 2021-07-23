const path = require("path");
const router = require("express").Router(); 

//Route to the notes page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

//wildcard route to any other page other than the notes or api pages
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router; 