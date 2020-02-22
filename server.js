var express = require("express");
var path = require("path");

var storage = require("./db/storage");

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

app.get("/api/notes", function(req, res) {
	storage.getNotes().then(notes => res.json(notes));
});

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function(req, res) {
	var newNote = req.body;
	storage.addNote(newNote).then(note => res.json(note));
});

app.delete("/api/notes/:id", function(req, res) {
	storage.removeNote(req.params.id).then(() => res.json({ ok: true }));
});
