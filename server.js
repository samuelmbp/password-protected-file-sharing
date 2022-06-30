const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads' });

// Template Engine
app.set('view engine', 'ejs');

// Static Files
// app.use('/css', express.static(path.join(__dirname + 'public/css')));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
	res.send('HI.');
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
