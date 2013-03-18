var express = require('express')
var MongoStore = require('connect-mongo')(express)

var port = process.env.PORT || 8080

var mongo_host = process.env.MONGO_HOST || 'localhost'
var mongo_port = process.env.MONGO_PORT || 27017
var mongo_db = process.env.MONGO_DB || 'test'

var mongo = require('mongoskin');

var ONE_YEAR = 1000 * 60 * 60 * 24 * 365

var app = express()
  .use(express.cookieParser())
  .use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })


app.get('/:db/:collection', passthru);
function passthru(req, res, next) {
  var database = req.params.db;
  var collection = req.params.collection;
  var db = mongo.db(mongo_host + ':' + mongo_port + '/' + database + '?auto_reconnect');

  var json = req.query.json;
  console.log("JSON", json)
  if(!json) {
    ql = [{}, {}];
  } else {
    ql = JSON.parse(json);
  }
  $collection = db.collection(collection)
  $collection.find(ql[0], ql[1]).toArray(function(err, results) {
    if(err) return res.send(400);
    res.json(results)
  })
}

app.listen(port, function() {
  console.log("passthru server running on port", port);
});
