var React = require('react');
var DefaultAdminLayout = require('./layouts/defaultAdmin');

export default class LoginAdmin extends React.Component {
  render() {
    return (
        <DefaultAdminLayout>
            <div className="content">
                <h2> Login </h2>
                <form action="signinAdmin" encType="multipart/form-data" method="post">
                    <label>Usuario:</label>
                    <input type="text" name="username" required="required"/>
                    <label>Password:</label>
                    <input type="password" name="password" required="required"/>
                    <input type="submit"/>
                </form>
                <form action="signup" method="get">
                    <input type="submit" value="Cadastrar"/>
                </form>
            </div>
        </DefaultAdminLayout>
    );
  }
}
