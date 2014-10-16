var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.post('/saveImage', function(req, res) {
	var collection = req.db.get('images');
	var image = {
		base_64: req.body.imgBase64.replace("data:image/jpeg;base64,", "").replace(" ", "+"),
		created: moment().format(), //current time
		pokemon: ""
	};
	collection.insert(image, function(err, records){
		res.send(err);
	});
});
router.get('/getDrawingFilenames', function(req, res) {
	var collection = req.db.get('images');
	var options = {
		limit: 12,
		sort: [['created','desc']],
		fields: {_id: 1, created: 1, pokemon: 1}
	};
	collection.find({}, options, function(err, records){
		res.contentType('application/json');
		res.send(JSON.stringify(records));
	});
});
module.exports = router;