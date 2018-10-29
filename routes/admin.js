var models = require('../models');
var express = require('express');
var router = express.Router();


//Primeira rota
router.get('/', function(req, res, next){

  //Verificar, pela sessão, se o usuario esta logado
  if(req.session == undefined || !req.session.logado) {
    res.render('login');
  }
  else {
    if(req.session.isAdmin)
      res.redirect('admin/home');
    else {
      res.send('<script> alert("Você não é administrador") </script>');    
    }
  }
});

//Rota quando o administrador estiver logado
router.get('/home', function(req, res){

  //Encontrar todas as categorias e da join com a tabela de produtos
	models.Category.findAll({
		include: [ models.Product ]
	}).then(function(categories) {
		res.render('admin',{ //Renderizar o admin.handlebars
			categories: categories //Produto esta dentro das categorias
		});
  });
  

});

//Rota de login
router.post('/login', function(req, res) {
  
  if (req.param('username')){
      models.User.find({
      where: {username: req.param('username'), password: req.param('password')} //Busca pelo usuario com mesmo username e password
      
    }).then(function(user){

      //Garante que encontrou o usuario
      if(user && user.isAdmin) {
        //Salva na sessao as credenciais do usuario
        req.session.id = user.id;
        req.session.username = user.username;
        req.session.isAdmin = user.isAdmin;
        req.session.logado = true;
        res.redirect('admin/home');
      }
      else {
        res.redirect('admin/');
        res.send('<script> alert("Você não é administrador") </script>');    
      }
    })
  }

});

router.route('/signup').get(function(req, res) {
  
  res.send('<form action="", method="post"/>'
            +'<label>Name:</label>'
            +'<input type="text", name="username" >'
            +'<label>Email:</label>'
            +'<input type="text", name="email" >'
            +'<label>Password:</label>'
            +'<input type="password", name="password" >'
            +'<input type="submit"/>'
            +'</form>');

}).post(function(req, res){ //Edita a categoria a partir das informações da pagina renderizada
  models.User.create({ //Cria produto com as informações passadas pelo form
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: true
  }).then(function(){res.redirect('/admin/login');});
});

//Rota para criar uma categoria
router.post('/categories/create', function(req, res) {

  if (req.param('categoryName')){
    models.Category.create({ //Criar uma categoria com a categoryName
      categoryName: req.param('categoryName')
    }).then(function() {
      res.redirect('admin/home');
    });
  }
});

//Rota para criar um produto
router.post('/categories/createproduct', function(req, res){
  models.Category.find({ //Encontra a categoria selecionada no form
    where: { categoryName: req.body.productCategory }
  }).then(function(category){
    models.Product.create({ //Cria produto com as informações passadas pelo form
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDesc: req.body.productDesc,
      productImage: req.files.thumbnail.name
  }).then(function(product){
      product.setCategory(category).then(function() {
        res.redirect('admin/home');
      });
    });
  });
  //}
});

//Editar categoria
router.route('/categories/:category_id/edit').get(function(req, res){
  models.Category.find({
    where: {id: req.param('category_id')},
    include: [models.Product]
  }).then(function(category){ //Renderiza a pagina para editar a categoria
    res.send('<form action="", method="post"/>'
            +'<label>Name:</label>'
            +'<input type="text", name="categoryName" value=\"'+ category.categoryName +'\" >'
            +'<input type="submit"/>'
            +'</form>');
    });
  }).post(function(req, res){ //Edita a categoria a partir das informações da pagina renderizada
    models.Category.find({where: {id: req.param('category_id')}}).then(function(category){
      category.updateAttributes({
      categoryName: req.body.categoryName
    }).then(function(){res.redirect('admin/home');});
  });
});


//Deletar categoria
router.get('/categories/:category_id/destroy',function(req, res) {
  models.Category.find({//Encontrar e Deletar categoria com o ID da categoria
    where: {id: req.param('category_id')},
    include: [models.Product]
  }).then(function(category) {
    models.Product.destroy(
      {where: {CategoryId: category.id}}
    ).then(function(affectedRows) {
      category.destroy().then(function() {
        res.redirect('admin/home');
      });
    });
  });
});

//Editar produto
router.route('/categories/:category_id/products/:product_id/edit').get(function(req, res){
  models.Category.find({ //Encontrar categoria do produto
    where: {id: req.param('category_id')}
  }).then(function(category){
    models.Product.find({//Encontrar produto
      where: {id: req.param('product_id')}
    }).then(function(product){ //REndenrizar pagina para editar produto
      models.Category.findAll({include: [ models.Product ]}).then(function(categories){
        var optionText = "";
        for(var i=0;i<categories.length;i++){
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
}).post(function(req, res){ //Edita o produto de acordo com as informações passadas pela pagina
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
          res.redirect('admin/home');
        });
      });
    });
  });
});

//Deletar produto
router.get('/categories/:category_id/products/:product_id/destroy', function (req, res) {
  models.Category.find({ //Encontrar categoria do produto
    where: { id: req.param('category_id') }
  }).then(function(category) {
    models.Product.find({ //Encontrar produto para deletar
      where: { id: req.param('product_id') }
    }).then(function(product) {
      product.setCategory(null).then(function() {
        product.destroy().then(function() {
          res.redirect('admin/home');
        });
      });
    });
  });
});

//Rota para redirencionar usuario caso mande um url errada
router.get('/*', function(req, res){
  res.redirect('/admin');
});

module.exports = router;