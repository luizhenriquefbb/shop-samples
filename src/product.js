template = $('#handlebar').html(); //using Jquery
// var template = String(document.getElementsByTagName("HTML")[0]) //vanilla
// var template = document.getElementsByTagName("#handlebar")[0]

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
binded = { }




//Compile the template data into a function
var templateScript = Handlebars.compile(template);
// var templateScript = Handlebars.compile(String(template));

var html = templateScript(binded);
// var html = templateScript(index);

$(document.body).append(html);
// var body = document.getElementsByTagName("BODY")[0];
// body.innerHTML = html;