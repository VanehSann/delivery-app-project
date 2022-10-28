import { Component } from "react";
import Header from '../Components/Header'

class Client extends Component {
  constructor() {
    super();

    this.state = {};
  }
}

<>
<Header />

<div>
  <h2 data-testid = ""> Produtos </h2>
  <ul>
    { products.map(() => {
      <li>
        <produtos />
      </li>
    })}
  </ul>
</div>

</>

export default connect()(Client);
