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
      models.messages.get(function(data) {
        res.writeHead(200, headers);
        var test = {
          results: data
        }

        res.end(JSON.stringify(test));
      });

    }, 
    post: function (req, res) {  // a function which handles posting a message to the database
      // console.log('req.body in post: ', req.body);
   
      models.messages.post(req.body, function() {
        if (true) {
          res.writeHead(201, headers);
          res.end(JSON.stringify(req.body));
        }
      });
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
    },
    post: function (req, res) {}
  }
};

