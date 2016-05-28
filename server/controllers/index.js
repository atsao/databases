var models = require('../models');
var bluebird = require('bluebird');

//-------------------------------------------------------------------
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, //seconds
  "Content-type": "application/json"
};
//-------------------------------------------------------------------


module.exports = {
  messages: {
    get: function (req, res) {
      console.log('entering messages.get');
      // res.end('testing get');
      // console.log('req.url:', req.url);
      // // var data = "";
      // // request.on('data', function(chunk){
      // //   data += chunk;
      // // });
      // // request.on('end', function(){
      // //   // callback(JSON.parse(data));
      // //   res.writeHead(200, headers);
      // //   res.end(JSON.stringify(data));
      // // });
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "content-type, accept");
      models.messages.get(function(data) {
        res.writeHead(200, headers);
        var test = {
          results: data
        }

        res.end(JSON.stringify(test));
      });
// res.end('test');
    }, // a function which handles a get request for all messages
    post: function (req, res) {  // a function which handles posting a message to the database
      // console.log('req.body in post: ', req.body);
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        // callback(JSON.parse(data));
        models.messages.post(data, function() {
          if (true) {
            res.writeHead(201, headers);
            res.end(JSON.stringify(data));
          }
        });
      });
      // res.writeHead(200, headers);
      // res.end();
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // res.end('you want users?');
    },
    post: function (req, res) {}
  }
};

