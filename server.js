const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = 3001;
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// go the extra mile 
app.use('/api', api);
app.use(express.static('public'));

// get route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for note page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// Get db folder route
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  
});

