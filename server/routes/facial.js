var express = require('express');
var router = express.Router();

router.get('/recognize', function(req, res, next) {
	console.log('inside facial server');
	const spawn = require("child_process").spawn;
	const pythonProcess = spawn('python',["C:\\Users\\AWAB\\Desktop\\face\\recognize_faces_image_pic.py", "-e", "C:\\Users\\AWAB\\Desktop\\face\\encodings.pickle"]);
	pythonProcess.stdout.on('data', (data) => {
    	res.status(200).send(data);
	});	
});

module.exports = router;