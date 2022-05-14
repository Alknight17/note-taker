const fs = require('fs');
const path = require('path');

module.exports = app => {

    // create notes variable to use in routing
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // create get route for api/notes
        app.get('/api/notes', function(req, res) {
            res.json(notes);
        });

        // create get route for one specific note
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

        

    })



}