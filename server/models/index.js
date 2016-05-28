var db = require('../db');




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
      console.log('data, should be a {}: ', data);
      // { username: 'asdf', text: 'asdfsadfsadf', roomname: 'lobby' }
      console.log(data.username)
      console.log(data.text)
      console.log(data.roomname)
      //check if user id exists
      db.connection.query('SELECT id FROM users where username="' + data.username + '";', function(err, rows, fields) {
        if(!err) {
          var userId = rows[0].id;
          console.log('Rows:', rows, ' | type:', typeof rows);
          //yes: post to messages table
          console.log('in insert query');
          db.connection.query('insert into messages(userId, message, room) values('  + userId + ', "' + data.text + '", "' + data.roomname + '");', function(err, rows, fields) {
            if(!err) {
              callback(true);
            } else {
              console.log('error in query:', err);
            }
          });  
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

