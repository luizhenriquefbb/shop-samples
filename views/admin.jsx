var React = require('react');
var DefaultAdminLayout = require('./layouts/defaultAdmin');

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <DefaultAdminLayout>
                <div className="content">
                    <h2>Criar uma nova categoria</h2>
                    <form action="categories/create" method="post">
                        <label>Nome:</label>
                        <input type="text" name="categoryName" required="required"/>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>

                    <div className="separador"></div>


                    <h2>Criar um novo produto</h2>
                    <form action="categories/createproduct" encType="multipart/form-data" method="post">
                        <label>Nome:</label>
                        <input type="text" name="productName" required="required"/><br/>
                        
                        <label>Preço: R$ </label>
                        <input type="text" name="productPrice" required="required"/><br/>
                        
                        <div style={{"margin": "23px 0"}}>
                            <label>Descrição:</label><br/>
                            <textarea name="productDesc" required="required"></textarea><br/>
                        </div>
                        
                        <label>Imagem:</label>
                        <input type="file" name="thumbnail" required="required"/>
                        
                        <select name="productCategory">
                            {this.props.categories.map((category, i) => {
                                return (<option value={category.categoryName}>{category.categoryName}</option>) 
                            })}
                        </select>
                        <input type="submit"/>
                    </form>

                    <div className="separador"></div>

                    
                    <h2>Gerenciamento</h2>
                    <ul>
                        {this.props.categories.map((category, i) => {     
            
                            return (
                                <div>
                                    <li><p>{category.categoryName}</p></li>
                                    <li className="li-clean">
                                        <a href={"categories/" + category.id + "/destroy"}>Deletar</a>
                                        <span> | </span>
                                        <a href={"categories/" + category.id + "/edit"}>Editar</a>
                                    </li>
                                    <ul>
                                        {category.Products.map((product, i) => {     
                
                                            return (
                                                <div>
                                                    <li className="product-info">
                                                        <img src={"/tmp/" + product.productImage} className="list-products"/>
                                                        <p>{product.productName}</p><br/>
                                                        <p>R${product.productPrice}</p><br/>
                                                        <p>{product.productDesc}</p><br/>
                                                        <p>{product.productImage}</p>
                                                    </li>
                                                    <li className="li-clean" >
                                                        <a href={"categories/" + category.id + "/products/" + product.id + "/destroy"}>Deletar</a>
                                                        <span> | </span>
                                                        <a href={"categories/" + category.id + "/products/" + product.id + "/edit"}>Editar</a>
                                                    </li>
                                                        <div className="separador"></div>
                                                </div>
                                            ); 
                                        })}
                                    </ul>
                                </div>
                            ); 
                        })}
                    </ul>
                </div>
            </DefaultAdminLayout>      
        );
    }
}