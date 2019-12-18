// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/assets/index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/assets/notes.html"));
});

//Retrieve notes from the db.json
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Post a note function
notes = [];
app.post("/api/notes", function(req, res) {
  jason = path.join(__dirname, "/db/db.json");
  newNote = req.body;

  //gets JSON file and saves it
  function getJasonFile() {
    fs.readFile(jason, "utf8", function(error, response) {
      if (error) {
        console.log(error);
      }
      notes = JSON.parse(response);
      writeJasonFile();
    });
  }
  getJasonFile();

  function writeJasonFile() {
    //assigning IDs for notes
    notes.push(newNote);
    for (let i = 0; i < notes.length; i++) {
      note = notes[i];
      note.id = i + 1;
    }
    // adds a new note
    fs.writeFile(jason, JSON.stringify(notes), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Your note is saved!");
    });
  }
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Starting the server

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
