var Sequelize = require("sequelize");

var orm = new Sequelize("chatterbox", "root", "tsao");

var User = orm.define('User', {
  username: Sequelize.STRING
});

var Message = orm.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

User.sync(); // Initialize User table
Message.sync(); // Initialize Message table

exports.User = User;
exports.Message = Message; // Enable exports for Message