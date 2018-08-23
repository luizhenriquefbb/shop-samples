template = $('#handlebar').html();
// var template = String(document.getElementsByTagName("HTML")[0])
// var template = document.getElementsByTagName("#handlebar")[0]



// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
binded = {
    "products": [
        { 'id': 0, 'name': 'product0', 'price': '0.50', 'category': 'category 1', 'image_src': 'images/productImage1.png' },
        { 'id': 1, 'name': 'product1', 'price': '1.00', 'category': 'category 1', 'image_src': 'images/productImage1.png' },
        { 'id': 2, 'name': 'product2', 'price': '2.00', 'category': 'category 2', 'image_src': 'images/productImage1.png' },
        { 'id': 3, 'name': 'product3', 'price': '3.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' },
        { 'id': 4, 'name': 'product4', 'price': '4.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' },
        { 'id': 5, 'name': 'product5', 'price': '5.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' },
        { 'id': 6, 'name': 'product6', 'price': '6.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' },
        { 'id': 7, 'name': 'product7', 'price': '7.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' },
        { 'id': 8, 'name': 'product8', 'price': '8.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' },
        { 'id': 9, 'name': 'product9', 'price': '9.00', 'category': 'category 3', 'image_src': 'images/productImage1.png' }
    ],

    "shop_list": [],

    /**
     * Get all categories 
     */
    "get_categories": function () {
        var list_of_categories = [];
        for (var product of this.products) {
            if (!list_of_categories.includes(product.category)) {
                list_of_categories.push(product.category);
            }
        }
        return list_of_categories;
    },


}


function add_to_cart(product_index) {
    var product = binded.products[product_index];

    // check if already exists
    for (let index = 0; index < binded.shop_list.length; index++) {
        let shop_product = binded.shop_list[index];
        if (product.id == shop_product.product.id) {
            shop_product.qty += 1;
            refresh_price(get_price_total());
            return; // exit function
        }
    }

    binded.shop_list.push({ "product": product, "qty": 1 });
    refresh_price(get_price_total());
}

function refresh_price(total) {
    var x = document.getElementsByClassName("shop_list_price");
    for (var i = 0; i < x.length; i++) {
        x[i].innerHTML = total;
    }

    var table = document.getElementById("SL_hover_table");
    table.innerHTML = ''
    for (const sp of binded.shop_list) {
        var row = table.insertRow(-1);
        row.insertCell(0).innerHTML = sp.product.name;
        row.insertCell(1).innerHTML = sp.qty;
        row.insertCell(2).innerHTML = sp.product.price;
    }
}

/** Sums total to pay  */
function get_price_total() {
    var total = 0;
    for (var list_item of binded.shop_list) {
        total += parseFloat(list_item.product.price) * parseFloat(list_item.qty);
    }

    return total;
}


//Compile the template data into a function
var templateScript = Handlebars.compile(template);
// var templateScript = Handlebars.compile(String(template));

var html = templateScript(binded);
// var html = templateScript(index);

$(document.body).append(html);
// var body = document.getElementsByTagName("BODY")[0];
// body.innerHTML = html;