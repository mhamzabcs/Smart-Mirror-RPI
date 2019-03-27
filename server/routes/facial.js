var express = require('express');
var router = express.Router();


//idhar windows wala bana kar rakh de aka recognize_from_live_pic etc.
//check index/wakeword for that example
router.get('/recognize', function(req, res, next) {
	console.log('inside facial server');
	const spawn = require("child_process").spawn;
	var file = req.dest + "testpic.py";
	const pythonProcess = spawn('python',[file]);
	pythonProcess.stdout.on('data', (data) => {
    	res.status(200).send(data);
	});	
});

module.exports = router;