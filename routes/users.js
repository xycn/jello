var express = require('express');
var router = express.Router();
var hostConf = require('./jello_conf');

var proxy = function (app) {
	// import Seed Jello
	var Jello = require('./jello')(app, router);

	var host = Jello.mapModingValue(hostConf, 'ND_LEHI_ENV');
	console.log('map host: %s', host);
	
	// config server api seed 
	//var proxy = Jello.host('lehi.levp-tech.cn').protocol('https');
	var proxy = Jello.host('www.baidu.com').protocol('https');
	
	// backend api index
	var proxyIndexApi = proxy.api('/home/msg/data/personalcontent');
	var local = Jello.pathname('/index').api().map(proxyIndexApi);
	console.log(local.toUrlString(), '<--->', proxyIndexApi.toUrlString());

	// no backend, just an page
	local = Jello.page('/thanks').map();
	console.log(local.toUrlString());

	// with backend api index
	local = Jello.page('/3q').render('thanks').map(proxyIndexApi);
	console.log(local.toUrlString(), '<--->', proxyIndexApi.toUrlString());

	var proxySuperApi = proxy.api('/home/msg/data/%type').query({
		mode: 1,
	});
	local = Jello.api('/hello').map(proxySuperApi);
	console.log(local.toUrlString(), '<--->', proxySuperApi.toUrlString());

	//console.log(router);
	//
	var proxy2 = Jello.host('test.pay.yuanxian.le.com').protocol('http');
	var api302 = proxy2.api('/rest/1.0/smaug/levpsso/login/').post().accept302();
	Jello.pathname('/302').page().map(api302);

	return router;
}

module.exports = proxy;
