const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFile = util.promisify(fs.readFile);

let app = express();

let PORT = process.env.PORT || 3000;

let note = [];
let id = 0;
initialize();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//html routes
app.get("/notes", function (request, response) {
  response.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "/public/index.html"));
});
//API routes
app.get("/api/notes", function (request, response) {
  fs.readFile("/db/db.json", (err, note));
  return response.json(notes);
});

app.post("/api/notes", function (request, response) {
  let note = request.body;
  note.id = id;
  id++;
  notes.push(note);
  fs.writeFile(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes),
    function (err) {
      if (err) console.log(err);
    }
  );
  response.json(true);
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
    note.forEach(function (note) {
      if (note.id > highID) highID = note.id;
    });
  }
  highID++;
  id = highID;
}
//Stop Server
