const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");
const e = require("express");
const readFile = util.promisify(fs.readFile);

let app = express();

let PORT = process.env.PORT || 3000;

let note = [];
let id = 0;
initialize();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//html routes
app.get("/notes", function (request, response) {
  response.sendFile(path.join(__dirname, "/public/notes.html"));
});
//API routes
