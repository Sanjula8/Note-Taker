var fs = require("fs");
var util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class Storage {
	constructor() {
		this.lastid = 0;
	}

	read() {
		return readFileAsync("db/db.json", "utf8");
	}
	write(data) {
		return writeFileAsync("db/db.json", JSON.stringify(data));
	}
	getNotes() {
		return this.read().then(notes => {
			try {
				return [].concat(JSON.parse(notes));
			} catch (err) {
				return [];
			}
		});
	}
	addNote(note) {
		const { title, text } = note;
		const newNote = { title, text, id: ++this.lastid };
		return this.getNotes()
			.then(notes => [...notes, newNote])
			.then(updatedNotes => this.write(updatedNotes))
			.then(() => newNote);
	}
	removeNote(id) {
		return this.getNotes()
			.then(notes => notes.filter(note => note.id !== parseInt(id)))
			.then(filteredNotes => this.write(filteredNotes));
	}
}

module.exports = new Storage();
