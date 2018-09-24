var app = require('../shop');
var models = require("../models");

app.set('port', 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});