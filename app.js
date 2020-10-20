require('dotenv').config();

var express = require('express');
var app = express();

var user = require('./controllers/userController');
var log = require('./controllers/logController');
var sequelize = require('./db');

sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/api/user',user);


app.use(require('./middleware/validate-session'));
app.use('/log',log);

app.listen(3000, function(){
    console.log('App is listening on 3000.')
});
