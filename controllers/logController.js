var router = require('express').Router();
const { Router } = require('express');
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var logModel = sequelize.import('../models/log');



//? get all items for individual user
router.get('/', function(req, res){
    var userid = req.user.id;

    logModel
        .findAll({
            where: { owner: userid}
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err){
                res.send(500,err.message);
            }
        );
});

//? post for individula user
router.post('/', function (req,res){
    var description = req.body.description;
    var definition = req.body.definition;
    var result = req.body.result;
    var owner_id = req.user.id;

    logModel
        .create({
            description: description,
            definition: definition,
            result: result,
            owner_id: owner_id
        })
        .then(
            function createSuccess(data){
                res.json(data);
            },
            function createError(err){
                res.send(500,err.message);
            }
        );
});

//? get single item for individual user

router.get('/:id', function(req,res){
    var data = req.params.id;
    var userid = req.user.id;

    logModel
        .findOne({
            where: { id: data, owner_id: userid}
        }).then(
            function findOneSuccess(data){
                res.json(data);
            },
            function findOneError(err){
                res.send(500,err.message);
            }
        );
});

//?Delete

router.delete('/:id', function(req,res){
    var data = req.params.id;
    var userid = req.user.id;

    logModel
        .destroy({
            where: { id: data, owner_id: userid}
        }).then(
            function deleteLogSuccess(data){
                res.sent("Log removed");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
});

//? Update

router.put('/:id',function(req,res){
    var data = req.params.id;
    var definition = req.body.definition;
    var description = req.body.description;
    var result = req.body.result;

    logModel
        .update({
            definition: definition,
            description: description,
            result: result
        },
        {where: {id:data}}
        ).then(
            function updateSuccess(updatedLog){
                res.json({
                    definition: definition,
                    description: description,
                    result: result
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});





module.exports=router;