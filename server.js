var express = require("express");
var path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

// Get Routes:

app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});
