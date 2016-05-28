var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('select m.message as text, m.room as roomname, m.createdAt as createdAt, u.username as username from messages m inner join users u on u.id = m.userId;', function(err, rows, fields) {
        if (!err) {
          // console.log('The solution is: ', rows);
          callback(rows);
        } else {
          console.log('Error while performing Query.');
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      console.log('data, should be a {}', data);
      db.connection.query('SELECT * from messages;', function(err, rows, fields) {
        if (!err) {
          // console.log('The solution is: ', rows);
          callback(true);
        } else {
          console.log('Error while performing Query.');
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

