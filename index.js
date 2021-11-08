const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
const app = express();
const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// go the extra mile 
//app.use('/api', api);
app.use(express.static('public'));

// get route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for note page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Get db folder route
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  
});
// post saves in front end reference index.js in public
// take title and text from db.json
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNotes = {
      title,
      text,
      // id is being rendered in index.js new notes needs id or else itll break
      id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json(`notes added successfully 🚀`);
  } else {
    res.error('Error in adding new notes');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);