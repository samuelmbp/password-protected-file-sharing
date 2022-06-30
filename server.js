require('dotenv').config();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const File = require('./models/File');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const upload = multer({ dest: 'uploads' });

// DB Connection
mongoose.connect(process.env.DATABASE_URL);

// Template Engine
app.set('view engine', 'ejs');

// Static Files
// app.use('/css', express.static(path.join(__dirname + 'public/css')));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
	const fileData = {
		path: req.file.path, // Multer
		originalName: req.file.originalname,
	};

	if (req.body.password !== null && req.body.password !== '') {
		fileData.password = await bcrypt.hash(req.body.password, 10);
	}

	const file = await File.create(fileData);
	console.log(file);
	res.send(file.originalName);
});

app.listen(process.env.PORT);
