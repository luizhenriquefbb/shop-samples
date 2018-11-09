var models = require('../models');
var express = require('express');
var router = express.Router();


//Primeira rota
router.get('/', function(req, res, next){

    //Verificar, pela sessão, se o usuario esta logado
    verifySession(req, res, next);
  
    res.redirect('/home');

});

router.get('/home', function(req, res, next){

    verifySession(req, res, next);
    
	models.Category.findAll({
		include: [ models.Product ]
	}).then(function(categories) {
		res.render('category',{ 
			categories: categories
		});
    });
});

router.get('/login', function(req, res, next){
    res.render('login');
});
  
  
//Rota de login
router.post('/signin', function(req, res) {
    
    if (req.param('username')){
        models.User.find({
        where: {username: req.param('username'), password: req.param('password')} //Busca pelo usuario com mesmo username e password
        
      }).then(function(user){
  
        //Garante que encontrou o usuario
        if(user) {
          //Salva na sessao as credenciais do usuario
          req.session.id = user.id;
          req.session.username = user.username;
          req.session.isAdmin = user.isAdmin;
          req.session.logado = true;
          res.redirect('home');
        }
        else {
          res.redirect('/login');  
        }
      })
    }
  
});


router.get('/logout', function (req, res) {
    console.log('fazendo logout');
    
    if (req.session != undefined && req.session.logado) {
        req.session.id = "";
        req.session.username = "";
        req.session.isAdmin = false;
        req.session.logado = false;
        res.redirect('home');
        
    }

    // if (req.param('username')){
    //     models.User.find({
    //     where: {username: req.param('username'), password: req.param('password')} //Busca pelo usuario com mesmo username e password

    //   }).then(function(user){

    //     //Garante que encontrou o usuario
    //     if(user) {
    //       //Salva na sessao as credenciais do usuario

    //     }
    //     else {
    //       res.redirect('/login');  
    //     }
    //   })
    // }

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
      isAdmin: false
    }).then(function(){res.redirect('/login');});
});

router.get('/categories/:category_id/products/:product_id', function (req, res, next) {

    verifySession(req, res, next);

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

router.get('/categories/:category_id',function(req, res, next) {

    verifySession(req, res, next);

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

function verifySession(req, res, next) {
    if(req.session == undefined || !req.session.logado) {
      res.redirect('/login');
      next();
    }
}

module.exports = router;