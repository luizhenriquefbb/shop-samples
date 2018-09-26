var app = require('../shop');
var models = require("../models");

models.sequelize.sync().then(function () {
  var server = app.listen( 3000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});