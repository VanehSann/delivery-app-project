import React, { Component } from 'react';
import Header from '../components/Header';
import { requestData } from '../utils/axios';

class Client extends Component {
  constructor() {
    super();

    this.state = {};
  }

  async componentDidMount() {
    const products = await requestData('/products');
    console.log(products);
  }

  render() {
    return (
      <div>
        <Header />

        <div>
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

export default connect(null, null)(Client);
// export default Client;
