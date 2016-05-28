// var mysql = require('mysql');
// var mysql = require('sequelize');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".


// exports.connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'chatterbox'
// });

// connection.query('SELECT * from users', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

// connection.end();

//----------------Sequelize-------------------------------------------------------

/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatterbox", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('user', {
  username: Sequelize.STRING
});

var Message = sequelize.define('message', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.hasMany(Message, {foreignkey: 'message_pk'});
Message.belongsTo(User, {foreignkey: 'message_pk'});



//  ------Used on first initialize----------------------------
/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
// User.sync().then(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = User.build({username: "Jean Valjean"});
//   newUser.save().then(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     User.findAll({ where: {username: "Jean Valjean"} }).then(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].username + " exists");
//       }
//     });
//   });
// });
