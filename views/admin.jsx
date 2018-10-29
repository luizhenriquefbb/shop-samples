var React = require('react');
var DefaultAdminLayout = require('./layouts/defaultAdmin');

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <DefaultAdminLayout>
                <div class="content">
                    <h2>Criar uma nova categoria</h2>
                    <form action="categories/create" method="post">
                        <label>Nome:</label>
                        <input type="text" name="categoryName" required="required"/>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>

                    <h2>Criar um novo produto</h2>
                    <form action="categories/createproduct" enctype="multipart/form-data" method="post">
                        <label>Nome:</label>
                        <input type="text" name="productName" required="required"/><br/>
                        
                        <label>Preço: R$ </label>
                        <input type="text" name="productPrice" required="required"/><br/>
                        
                        <label>Descrição:</label><br/>
                        <textarea name="productDesc" required="required"></textarea><br/>
                        
                        <label>Imagem:</label>
                        <input type="file" name="thumbnail" required="required"/>
                        
                        <select name="productCategory">
                            {this.props.categories.map((category, i) => {     
        
                                return (<option value={category.categoryName}>{category.categoryName}</option>) 
                            })}
                        </select>
                        <input type="submit"/>
                    </form>

                    <h2>Categorias</h2>
                    <ul>
                        {this.props.categories.map((category, i) => {     
            
                            return (
                                <div>
                                    <li><p>{category.categoryName}</p></li>
                                    <li>
                                        <a href={"categories/" + category.id + "/destroy"}>Deletar</a>
                                        <a href={"categories/" + category.id + "/edit"}>Editar</a>
                                    </li>
                                    <ul>
                                        {category.Products.map((product, i) => {     
                
                                            return (
                                                <div>
                                                    <li>
                                                        <img src={"/tmp/" + product.productImage}/>
                                                        <p>{product.productName}</p><br/>
                                                        <p>${product.productPrice}</p><br/>
                                                        <p>{product.productDesc}</p><br/>
                                                        <p>{product.productImage}</p>
                                                    </li>
                                                    <li>
                                                        <a href={"categories/" + category.id + "/products/" + product.id + "/destroy"}>Deletar</a>
                                                        <a href={"categories/" + category.id + "/products/" + product.id + "/edit"}>Editar</a>
                                                    </li>
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