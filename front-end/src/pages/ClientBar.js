import React, { Component } from 'react';
import Header from '../components/Header';

class Client extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />

        <div>
          <h2 data-testid=""> Produtos </h2>
          <ul>
            {/* { products.map(() => {
              <li>
                <produtos />
              </li>;
            }) } */}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect()(Client);
