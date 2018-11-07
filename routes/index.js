var models = require('../models');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res){

	models.Category.findAll({
		include: [ models.Product ]
	}).then(function(categories) {
		res.render('category',{ 
			categories: categories
		});
    });
});

router.get('/categories/:category_id/products/:product_id', function (req, res) {

    models.Category.findAll({
		include: [ models.Product ]
	}).then(function(categories) {
        models.Category.find({ //Encontrar categoria do produto
        where: { id: req.param('category_id') }
        }).then(function(category) {
            models.Product.find({ //Encontrar produto
                where: { id: req.param('product_id') }
            }).then(function(product) {
                res.render('product',{ 
                    categories: categories,
                    category: category,
                    product: product
                });
            });
        });
    });
});

router.get('/categories/:category_id',function(req, res) {

    models.Category.findAll({
		include: [ models.Product ]
	}).then(function(categories) {
        models.Category.find({
            where: {id: req.param('category_id')},
            include: [ models.Product ]
        }).then(function(category) {
            res.render('category',{ 
                categories: categories,
                category: category
            });
        });
    });
});

//Rota para redirencionar usuario caso mande um url errada
router.get('/*', function(req, res){
  res.redirect('/');
});

module.exports = router;