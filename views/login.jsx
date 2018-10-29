var React = require('react');
var DefaultLayout = require('./layouts/default');

export default class Login extends React.Component {
  render() {
    return (
        <DefaultLayout>
            <div class="content">
                <h2> Login </h2>
                <form>
                    <label>Usuario:</label>
                    <input type="text" name="username" required="required"/>
                    <label>Password:</label>
                    <input type="password" name="password" required="required"/>
                    <input type="submit"/>
                </form>
                <form>
                    <input type="submit" value="Cadastrar"/>
                </form>
            </div>
        </DefaultLayout>
    );
  }
}
