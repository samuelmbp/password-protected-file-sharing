require('dotenv').config();
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const File = require('./models/File');
const handleDownload = require('./helpers/handleDownload');

// Middleware
app.use(express.urlencoded({ extended: true })); // Helps with the HTML form

const upload = multer({ dest: 'uploads' });

// DB Connection
mongoose.connect(process.env.DATABASE_URL);

// Template Engine
app.set('view engine', 'ejs');

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
	res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` }); // localhost
});

app.route('/file/:id').get(handleDownload).post(handleDownload);

app.listen(process.env.PORT);
