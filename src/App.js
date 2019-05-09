import React, { Component } from 'react';
import {API_KEY} from './Secrets.js'

class App extends Component {
  state = {data: null}

  componentDidMount = () => {
    console.log(API_KEY)
    fetch("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key="+API_KEY)
    .then(data => data.json())
    .then(data => this.setState({data}))
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
      {JSON.stringify(this.state.data)}
      </div>
    );
  }
}

export default App;
