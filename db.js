const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutlog2','postgres',process.env.DB_CONNECTION_STRING, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to workoutlog2 postres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports=sequelize;