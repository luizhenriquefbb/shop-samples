var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

  console.log("get all categories");

	models.Category.findAll({
		include: [ models.Product ]
	}).then(function(categories) {
    console.log("get render");
		res.render('admin',{
			categories: categories
		});
	});
});

//categories
//handle create new category form
router.post('/categories/create', function(req, res) {
  if (req.param('categoryName')){
    models.Category.create({
      categoryName: req.param('categoryName')
    }).then(function() {
      res.redirect('/admin');
    });
  }
});

//create new product
router.post('/categories/createproduct', function(req, res){
  models.Category.find({
    where: { categoryName: req.body.productCategory }
  }).then(function(category){
    console.log("thumb: " + req.files.thumbnail);
    models.Product.create({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDesc: req.body.productDesc,
      productImage: req.files.thumbnail.name
  }).then(function(product){
      product.setCategory(category).then(function() {
        res.redirect('/admin');
      });
    });
  });
  //}
});

//edit category
router.route('/categories/:category_id/edit').get(function(req, res){
  models.Category.find({
    where: {id: req.param('category_id')},
    include: [models.Product]
  }).then(function(category){
    res.send('<form action="", method="post"/>'
            +'<label>Name:</label>'
            +'<input type="text", name="categoryName" value=\"'+ category.categoryName +'\" >'
            +'<input type="submit"/>'
            +'</form>');
    });
  }).post(function(req, res){
    models.Category.find({where: {id: req.param('category_id')}}).then(function(category){
      category.updateAttributes({
      categoryName: req.body.categoryName
    }).then(function(){res.redirect('/admin');});
  });
});


//delete category
router.get('/categories/:category_id/destroy',function(req, res) {
  models.Category.find({
    where: {id: req.param('category_id')},
    include: [models.Product]
  }).then(function(category) {
    models.Product.destroy(
      {where: {CategoryId: category.id}}
    ).then(function(affectedRows) {
      category.destroy().then(function() {
        res.redirect('/admin');
      });
    });
  });
});

//edit product
router.route('/categories/:category_id/products/:product_id/edit').get(function(req, res){
  models.Category.find({
    where: {id: req.param('category_id')}
  }).then(function(category){
    models.Product.find({
      where: {id: req.param('product_id')}
    }).then(function(product){
      models.Category.findAll({include: [ models.Product ]}).then(function(categories){
        var optionText = "";
        for(var i=0;i<categories.length;i++){
          //console.log("+++"+categories[i].categoryName);
          optionText += '<option value="'
                            +categories[i].categoryName
                            +'">'
                            +categories[i].categoryName
                            +'</option>';
        }

        res.send('<form action="", enctype="multipart/form-data", method="post"/>'
                +'<label>Name:</label>'
                +'<input type="text", name="productName" required="required" value='+ product.productName +' /><br>'
                +'<label>Price:</label>'
                +'<input type="text", name="productPrice" required="required" value='+ product.productPrice +' /><br>'
                +'<label>Description:</label><br>'
                +'<textarea rows="4", cols="50", name="productDesc" required="required" >'+ product.productDesc +'</textarea><br>'
                +'<label>Image:</label>'
                +'<input type="file", name="thumbnail" />'
                +'<select name="productCategory">'
                +optionText
                +'</select>'
                +'<input type="submit"/>'
                +'</form>');
      });
    });
  });
}).post(function(req, res){
  models.Category.find({
    where: { id: req.param('category_id') }
  }).then(function(category) {
    models.Product.find({
      where: { id: req.param('product_id') }
    }).then(function(product) {
    
        if (req.files.thumbnail){
          product.updateAttributes({productImage: req.files.thumbnail.name});
        }
        product.updateAttributes({
          productName: req.body.productName,
          productPrice: req.body.productPrice,
          productDesc: req.body.productDesc
        }).then(function(category2){
          models.Category.find({
          where: {categoryName: req.body.productCategory}
        }).then(function(category2){
          product.setCategory(category2);
        }).then(function() {
          res.redirect('/admin');
        });
      });
    });
  });
});

//delete product
router.get('/categories/:category_id/products/:product_id/destroy', function (req, res) {
  models.Category.find({
    where: { id: req.param('category_id') }
  }).then(function(category) {
    models.Product.find({
      where: { id: req.param('product_id') }
    }).then(function(product) {
      product.setCategory(null).then(function() {
        product.destroy().then(function() {
          res.redirect('/admin');
        });
      });
    });
  });
});

router.get('/*', function(req, res){
  res.redirect('/admin');
});

module.exports = router;