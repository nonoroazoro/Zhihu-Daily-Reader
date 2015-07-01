var express = require('express');
var jade = require('jade');
var path = require('path');
var router = express.Router();

var resolver = require('../lib/path-resolver')(path.join(__dirname,
  '../public/home'));

/* GET home page. */
router.get('/', function (req, res, next)
{
  var fn = jade.compileFile(resolver.resolve('index.jade'));
  res.write(fn(
  {
    title: 'Express'
  }));
  res.end();
});

module.exports = router;
