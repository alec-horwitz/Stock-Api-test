import React, { Component } from 'react';
import UUID from 'uuid';
import {API_KEY} from './Secrets.js'

class App extends Component {
  state = {dataset: null}

  componentDidMount = () => {
    fetch("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key="+API_KEY)
    .then(res => res.json())
    .then(res => this.setState({dataset: res.dataset_data}))
  }

  renderRows = () => {
    return (
      <table><tbody>{[
        <tr key={UUID()}>
          {this.state.dataset.column_names.map(colName => {
            return <td key={UUID()}>{colName}</td>
          })}
        </tr >, 
        ...this.state.dataset.data.map(row => {
          return <tr key={UUID()}>{row.map(colval => <td key={UUID()}>{colval}</td>)}</tr>
        })
      ]}</tbody></table>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.dataset ? this.renderRows() : null}
      </div>
    );
  }
}

export default App;
