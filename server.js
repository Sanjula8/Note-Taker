var express = require("express");
var path = require("path");
var fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Listener:
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

// Get HTML Routes:

app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Get API Routes:

let storedNotes = require("./db/db.json");
// let notesArray = JSON.parse(storedNotes);

app.get("/api/notes", function(req, res) {
	res.json(storedNotes);
	console.log(storedNotes);
});

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function(req, res) {
	var newNote = req.body;
	storedNotes.push;
	res.json(newNote);
});

// var newCharacter = req.body;

// newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

// console.log(newCharacter);

// characters.push(newCharacter);

// res.json(newCharacter);
