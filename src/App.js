import React, { Component } from 'react';
import UUID from 'uuid';
import {API_KEY} from './Secrets.js'

class App extends Component {
  state = {
    data: null
  }

  componentDidMount = () => {
    this.getData(this.props.tickers)
  }

  getData = (tickers, i=0, data={}) => {
    if (i < Object.keys(tickers).length) {
      fetch("https://www.quandl.com/api/v3/datasets/WIKI/"+tickers[i]+"/data.json?api_key="+API_KEY)
      .then(res => res.json())
      .then(res => {
        data[tickers[i]] = res.dataset_data.data[0][4]
        this.getData(tickers, i+1,data)
      })
    }
    else {
      this.setState({data})
    }
  }

  renderRows = () => {
    return (
      <table><tbody>
        <tr key={UUID()}>
          {
            Object.keys(this.state.data).map(key => {
              return <td key={UUID()}>{key}</td>
            })
          }
        </tr >  
        <tr key={UUID()}>
          {
            Object.keys(this.state.data).map(key => {
              return <td key={UUID()}>{this.state.data[key]}</td>
            })
          }
        </tr>
      </tbody></table>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Closing Prices</h1>
        {this.state.data ? this.renderRows() : "loading data..."}
      </div>
    );
  }
}

export default App;
