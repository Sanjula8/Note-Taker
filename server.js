var express = require("express");
var path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Listener:
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

// Get HTML Routes:

app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Get API Routes:

app.get("/api/notes", function(req, res) {
	res.json(tableData);
});

app.get("/api/index", function(req, res) {
	res.json(waitListData);
});
