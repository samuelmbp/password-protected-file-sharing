const File = require('../models/File');
const bcrypt = require('bcrypt');

async function handleDownload(req, res) {
	const file = await File.findById(req.params.id);

	if (file.password != null) {
		if (req.body.password == null) {
			res.render('password');
			return;
		}

		if (!(await bcrypt.compare(req.body.password, file.password))) {
			res.render('password', { error: true });
			return;
		}
	}

	file.downloadCount++;
	file.save();
	console.log(file.downloadCount);

	res.download(file.path, file.originalName);
}

module.exports = handleDownload;
