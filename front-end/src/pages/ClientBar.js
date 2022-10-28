import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
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
        <NavBar />
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
