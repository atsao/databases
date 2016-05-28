var db = require('../db');


var postMessage = function(data, userId, callback) {
  db.connection.query('insert into messages(userId, message, room) values('  + userId + ', "' + data.text + '", "' + data.roomname + '");', function(err, rows, fields) {
    if(!err) {
      callback(true);
    } else {
      console.log('error in query:', err);
    }
  });  
};

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('select m.message as text, m.room as roomname, m.createdAt as createdAt, u.username as username, m.id as objectId from messages m inner join users u on u.id = m.userId;', function(err, rows, fields) {
        if (!err) {
          // console.log('The solution is: ', rows);
          callback(rows);
        } else {
          console.log('Error while performing Query.');
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      // console.log('data, should be a {}: ', data);
      // { username: 'asdf', text: 'asdfsadfsadf', roomname: 'lobby' }
      // console.log(data.username)
      // console.log(data.text)
      // console.log(data.roomname)
      //check if user id exists
      db.connection.query('SELECT id FROM users where username="' + data.username + '";', function(err, rows, fields) {
        if(!err) {
          var userId = 0;

          if (rows.length > 0) {
            // User exists
            userId = rows[0].id;
            postMessage(data, userId, callback);
          } else {
            db.connection.query('insert into users(username) values("' + data.username + '");', function(err, rows, fields) {
              if(!err) {
                db.connection.query('SELECT id FROM users where username="' + data.username + '";', function(err, rows, fields) {
                  if (!err) {
                    userId = rows[0].id;
                    postMessage(data, userId, callback);
                  } else {
                    console.log('error in select:', err);
                  }
                });
              } else {
                console.log('error in query to create user row:', err);
              }
            });  
          }

          //yes: post to messages table

          // db.connection.query('insert into messages(userId, message, room) values('  + userId + ', "' + data.text + '", "' + data.roomname + '");', function(err, rows, fields) {
          //   if(!err) {
          //     callback(true);
          //   } else {
          //     console.log('error in query:', err);
          //   }
          // });  
        } else {
          console.log('err in the query:', err);
        }

      });
        

        //post to messages table

      //else: create user to table

      //add message to mesages table

      // db.connection.query('SELECT * from messages;', function(err, rows, fields) {
      //   if (!err) {
      //     // console.log('The solution is: ', rows);
      //     callback(true);
      //   } else {
      //     console.log('Error while performing Query.');
      //   }
      // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

