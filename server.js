const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // Return the DB file
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
  // Get the Data
  const data = req.body;
  // Create Unique ID
  const id = Date.now();
  // Read the DB file
  const db = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8');
  // Add the Note object
  const note = {
    id: id,
    title: data.title,
    text: data.text,
  };
  const dbObj = JSON.parse(db);
  dbObj.push(note);
  // Save the DB file
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbObj), 'utf8');
  // Return the DB file
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.delete('/api/notes/\*', (req, res) => {
  // Get the ID
  const id = req.url.split('/')[3];
  // Read the DB file
  const db = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8');
  // Remove the Object with ID
  const dbObj = JSON.parse(db);
  for (let x = 0; x < dbObj.length; x++) {
    if (dbObj[x].id.toString() === id) {
      dbObj.splice(x, 1);
      break;
    }
  }
  // Save the DB file
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbObj), 'utf8');
  // Return the DB file
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
