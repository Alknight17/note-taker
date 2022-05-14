const fs = require('fs');
const path = require('path');

module.exports = app => {

    // create notes variable to use in routing
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // create GET route for api/notes
        app.get('/api/notes', function(req, res) {
            res.json(notes);
        });

        // create GET route for one specific note
        app.get('/api/notes/:id', function(req, res) {
            res.json(notes[req.params.id]);
        });

        // Show notes page when accesing notes route
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(_dirname, "../public/notes.html"));
        });

        // Show index page when accesing other routes
        app.get('*', function(req, res) {
            res.senfFile(path.join(__dirname, "../public/index.html"));
        });

        // create route to POST api/notes
        app.post('api/notes', function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            returnconsole.log('Added new note: ' + newNote.title);
        });

        // create route to DELETE specific note
        app.delete('/api/notes/:id', function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Note #" + req.params.id + " has been deleted");
        });

        // create funtion to update the db.json file when editing/adding/deleting notes
        function updateDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
                if(err) throw err;
                return true;
            });
        }
    });
};