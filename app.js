const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");
let db = require("./db/db.json");

const readFile = util.promisify(fs.readFile);

let app = express();

let PORT = process.env.PORT || 3000;

let note = [];
let id = 0;
initialize();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//html routes
app.get("/notes", function (request, response) {
  response.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API routes
app.get("/api/notes", function (request, response) {
  fs.readFile("./db/db.json", (err, data));
  return response.json(notes);
});

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "/public/index.html"));
});
app.post("/api/notes", (request, response) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let noteData = JSON.parse(data);

    console.log(noteData);
    noteData.push(request.body);
    for (let i = 0; i < noteData.length; i++) {
      noteData[i].id = i + 1;
    }

    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
      if (err) throw err;
      response.send(db);
    });
  });
});

//Start server
app.listen(PORT, function () {
  console.log("Server started on port: " + PORT);
});

async function initialize() {
  await readNotes();
  setId();
}

async function readNotes() {
  note = JSON.parse(await readFile(path.join(__dirname, "/db/db.json")));
}

function setId() {
  let highID = 0;
  if (note.length > 0) {
    note.map(function (note) {
      if (note.id > highID) highID = note.id;
    });
  }
  highID++;
  id = highID;
}
