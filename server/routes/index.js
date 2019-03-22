var express = require('express');
var router = express.Router();
const request = require('request');
var myGoogleNews = require('my-google-news');
myGoogleNews.resultsPerPage = 10; // max 100

router.get('/weather', function(req, res, next) {
	request('http://api.openweathermap.org/data/2.5/weather?q=lahore,pk&appid=' + process.env.WEATHER_API_KEY, (err, response) => {
		if (err) { 
			return console.log(err);
		}
    	res.status(200).send(response.body);
	});
});

router.get('/forecast', function(req, res, next) {
	request('http://api.openweathermap.org/data/2.5/forecast/daily?q=lahore,pk&cnt=5&appid=' + process.env.WEATHER_API_KEY, (err, response) => {
		if (err) { 
			return console.log(err);
		}
		res.status(200).send(response.body);
	});
});

router.get('/news', function(req, res, next) {
	var nextCounter = 0;
	var googleQuery="pakistan"; //search Query
	myGoogleNews(googleQuery, function (err, reso){
		if (err) {
			console.error(err)
		}
		res.status(200).send(reso.links);
	  //number of pages if you want more than one page
	  /*if (nextCounter < 4) {
		nextCounter += 1
		if (res.next) res.next()
	  }*/
	});
});

router.get('/wakeWord', function(req, res, next) {
	console.log('inside wakeword server');
	const spawn = require("child_process").spawn;
	const pythonProcess = spawn('python',["E:\\Porcupine-1.3\\demo\\python\\porcupine_demo.py", "--keyword_file_paths", "E:\\Porcupine-1.3\\smartmirror_windows.ppn"]);
	pythonProcess.stdout.on('data', (data) => {
    	res.status(200).send(data);
	});	
});

//rename this router you shit!
router.get('/exp', function(req, res, next){
	console.log('inside voice experiment');
	var dir = __dirname + "\\python\\finalDraft.py";
	const spawn = require("child_process").spawn;
	const pythonProcess = spawn('python',[dir]);
	pythonProcess.stdout.on('data', (data) => {
		var resq = data.toString('utf8').split(/\r?\n/);
    	resq.length = 4;
		res.status(200).send(resq);
	});
});

//just to test if a script is spawning
router.get('/experimental', function(req, res, next){
	var exec = require('child_process').exec;
	console.log('in exp new');
	exec('python /home/pi/porc/sm/server/routes/python/finalDraft.py', function(error, stdout, stderr) {
	console.log('in here');
	console.log('stdout: ' + stdout);
	if (error !== null) {
	  console.log('exec error: ' + error);
	}
	});
});

module.exports = router;