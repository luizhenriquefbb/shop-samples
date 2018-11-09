var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>Compras Online</title>
            <script src="/js/jquery-1.11.2.min.js"></script>
            <link rel="stylesheet" type="text/css" href="/css/style.css"/>
            <link rel="stylesheet" type="text/css" href="/css/index.css"/>
            <script type="text/javascript" src="/js/main.js"></script>

            <link rel="stylesheet" href="/css/fontawesome.min.css"/>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
        </head>
        <body>
            <header className="cabecalho">
                <h1 className="logo">
                    <a href='../'>Compras Online</a>
                    <p>Produtos de várias categorias</p>
                </h1>
               
                {/* <a href="/logout">logout</a> */}

                <form action="http://localhost:3000/logout" method="get">
                    <input type="submit" value="logout" className="logout"/>
                </form>
            </header>

            <main className="principal">
                {this.props.children}
            </main>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;