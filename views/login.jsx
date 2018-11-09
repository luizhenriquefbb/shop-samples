var React = require('react');
var DefaultAdminLayout = require('./layouts/defaultAdmin');

export default class Login extends React.Component {
  render() {
    return (
        <DefaultAdminLayout>
            <div className="content">
                <h2> Login </h2>
                <form action="signin" encType="multipart/form-data" method="post">
                    <div className="row">
                        <label>Usuario:</label>
                        <input type="text" name="username" required="required"/>
                    </div>
                    <div className="row">
                        <label>Password:</label>
                        <input type="password" name="password" required="required" className="input-password"/>
                    </div>
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
