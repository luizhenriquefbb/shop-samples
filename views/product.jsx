var React = require('react');
var DefaultLayout = require('./layouts/default');

export default class Product extends React.Component {
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
                        <p id="path"> <a href="/"> Home </a> > <a href={"/categories/" + this.props.category.id}> {this.props.category.categoryName} </a> > {this.props.product.productName} </p>
                        <div id="product">
                          <ul>
                            <li className="product"> <img id="product-img" src={"/tmp/" + this.props.product.productImage}/> </li> 
                            <li id="description" className="product"> 
                              <h2 id="description-name" className="description">{this.props.product.productName}</h2>
                              <p id="description-price" className="description">Preço: R$ {this.props.product.productPrice} </p>
                              <p className="description" id="textDescription">Descrição: {this.props.product.productDesc}</p>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
        </DefaultLayout>
    );
  }
}