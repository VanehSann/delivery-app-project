import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { requestData } from '../utils/axios';

class Client extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const products = await requestData('/products');
    this.setState({
      products: [...products],
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <NavBar />
        <ProductCard products={ products } />
      </div>
    );
  }
}

export default connect(null, null)(Client);
