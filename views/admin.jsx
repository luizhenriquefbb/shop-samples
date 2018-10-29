var React = require('react');
var DefaultLayout = require('./layouts/default');

export default class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newCategory: '',
        }
        
    }

    handleNewCategory(event) {
        this.setState({newCategory: event.target.value});
    }

    sendNewCategory(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('categoryName', this.state.newCategory);

        alert("AAAAAAAAAAAAAAAAAAAAAAAAFormadata" + formData.categoryName);

        fetch('/categories/create', {
            method: 'post',
            body: formData
        });
        
    }

    render() {
        return ( 
            <DefaultLayout>
                <div class="content">
                    <h2>Criar uma nova categoria</h2>
                    <form onSubmit={this.sendNewCategory} action="categories/create" method="post">
                        <label>Nome:</label>
                        <input type="text" name="categoryName" required="required" onChange={this.handleNewCategory}/>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>

                    <h2>Criar um novo produto</h2>
                    <form>
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
        
                                return (<option value="{{categoryName}}">{category.categoryName}</option>) 
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
                                    <li><a href="categories/{{this.id}}/destroy">Deletar</a>
                                            <a href="categories/{{this.id}}/edit">Editar</a>
                                    </li>
                                    <ul>
                                        {category.Products.map((product, i) => {     
                
                                            return (
                                                <div>
                                                    <li>
                                                        <img src="/tmp/{{this.productImage}}"/><p>{this.productName}</p><br/><p>${this.productPrice}</p><br/><p>{this.productDesc}</p><br/><p>{this.productImage}</p>
                                                    </li>
                                                    <li>
                                                        <a href="categories/{{../this.id}}/products/{{this.id}}/destroy">Deletar</a>
                                                        <a href="categories/{{../this.id}}/products/{{this.id}}/edit">Editar</a>
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
            </DefaultLayout>      
        );
    }
}