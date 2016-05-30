var models = require('../models');
var bluebird = require('bluebird');

var orm = require('../db');
var Message = orm.Message;
var User = orm.User;
// var headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10, //seconds
//   "Content-type": "application/json"
// };


module.exports = {
  messages: {
    get: function (req, res) {
      Message.findAll({ include: [User] }).then(function(messages) {
        var data = {
          results: messages
        }
        res.json(data);
      });
    }, 
    post: function (req, res) { 
      User.findOrCreate({ where: { username: req.body['username'] } }).then(function(user) {
        console.log('*********************');
        console.log('user: ', user[0].dataValues);
        var params = {
          text: req.body['text'],
          UserId: user[0].dataValues.id,
          roomname: req.body['roomname']
        };

        Message.create(params).then(function(messages) {
          res.sendStatus(201);
        }).catch(function(error) {
          console.log('Error in posting user with message. Error:', error);
        });
      });
    } 
  },

  users: {
    get: function (req, res) {
      User.findAll().then(function(users) {
        var data = {
          results: users
        }
        res.json(data);
      });
    },
    post: function (req, res) {
      User.create({ username: req.body['username'] }).then(function(user) {
        res.sendStatus(201);
      });
    }
  }
};

