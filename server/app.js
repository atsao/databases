var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());



var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, //seconds
  "Content-type": "application/json"
};


// app.get('/', function(req, res, next) {
//   console.log(req.url);
//   console.log(req.method);
//   // console.log(Object.keys(req));
//   console.log(req.body);
//   res.end('Testing server');
// })


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, accept");
  next();
});
// Set up our routes
app.use(express.static(__dirname + "/../client"));
app.use("/classes", router);
// app.use("/", router);

// Serve the client files

// app.get('/', function(req, res) {
//   // res.writeHead(200);
//   // res.end();
//   db.connection.query('SELECT * from messages;', function(err, rows, fields) {
//     if (!err) {
//       console.log('The solution is: ', rows);
//       res.writeHead(200, headers);
//       res.end(JSON.stringify(rows));
//     } else {
//       console.log('Error while performing Query.');
//     }
//   });
// });


// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));

  db.connection.connect(); // Connect to our database

  console.log("Listening on", app.get("port"));
}

