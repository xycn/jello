var express = require('express');
var router = express.Router();
var MD = require('mobile-detect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function (req, resp, next) {
	var md = new MD(req.headers['user-agent']);
	resp.json({
		jello: 'world',
		mobile: md.mobile(),
		phone: md.phone(),
	})
});

module.exports = router;
