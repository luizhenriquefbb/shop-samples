var React = require('react');
var DefaultLayout = require('./layouts/default');

export default class Category extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        category: this.props.category == undefined ? this.props.categories[0] : this.props.category
    }
  }

  render() {

    return (
        <DefaultLayout>
            <div id="content">
                <div id="left-content">
                <h2>Categorias</h2>
                <ul>
                    {this.props.categories.map((category, i) => { 
                        return (
                            <div>
                                <li className="categories"> <a href={"/categories/" + category.id}>{category.categoryName}</a> </li>
                            </div>
                        )
                    })}
                </ul>
                </div>

                <div id="right-content">
                    <p id="path"> <a href="/"> Home </a> > {this.state.category.categoryName} </p>
                    <div id="products-list">
                        <ul>
                      {this.state.category.Products.map((product, i) => { 
                          return (
                                  
                            <li className="products"> 
                                <ul>
                                    <li> <img className="list-products" src={"/tmp/" + product.productImage}/> </li>
                                    <li> <a href={"/categories/" + this.state.category.id + "/products/" + product.id + "/"}>{product.productName}</a></li>
                                    <li>Preço: R$ {product.productPrice}</li>
                                </ul>
                            </li>   
                          )
                      })}
                        </ul>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
  }
}
