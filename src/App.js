import React, { Component } from 'react';
import UUID from 'uuid';
import {API_KEY} from './Secrets.js'

const sampleGraphs = [
  {
    id:0, 
    name:"Graphı", 
    type:"Line Graph", 
    stocks:[
      {
        id:0, 
        ticker: "GOOG",
        visible:true
      },
      {
        id:1, 
        ticker: "HOG",
        visible:false
      },
      {
        id:2, 
        ticker: "TXN",
        visible:false
      },
    ]
  },
  {
    id:1, 
    name:"GrÁf 2", 
    type:"Bar Chart", 
    stocks:[
      {
        id:0, 
        ticker: "HPQ",
        visible:false
      },
      {
        id:1, 
        ticker: "INTC",
        visible:true
      },
      {
        id:2, 
        ticker: "BRK_A",
        visible:false
      },
    ]
  },
  {
    id:2, 
    name:"gRAPHπ", 
    type:"Scatter Plot", 
    stocks:[
      {
        id:0, 
        ticker: "WMT",
        visible:false
      },
      {
        id:1, 
        ticker: "MSFT",
        visible:false
      },
      {
        id:2, 
        ticker: "TGT",
        visible:true
      },
    ]
  }]

class App extends Component {
  state = {
    data: null
  }

  componentDidMount = () => {
    let graphs = JSON.parse(JSON.stringify(sampleGraphs))
    this.getData(graphs)
    
  }

  getData = (graphs, i=0, j=0) => {
    if (i < graphs.length) {
      if (j < graphs[i].stocks.length) {
        fetch("https://www.quandl.com/api/v3/datasets/WIKI/"+graphs[i].stocks[j].ticker+"/data.json?api_key="+API_KEY)
        .then(res => res.json())
        .then(res => {
          graphs[i].stocks[j].dataset = res.dataset_data.data
          this.getData(graphs, i, j+1)
        })
      } else {
        this.getData(graphs, i+1)
      }
    } else {
      this.setState({data:graphs})
    }
  }

  renderRows = () => {
    let stocks = []
    let graphStocks = this.state.data.map(graph => {
      return graph.stocks
    })
    graphStocks.forEach(stockList => {
      stocks = [...stocks, ...stockList]
    })
    return (
      <table><tbody>
        <tr key={UUID()}>
          {
            stocks.map(stock => {
              return <td key={UUID()}>{stock.ticker}</td>
            })
          }
        </tr >  
        <tr key={UUID()}>
          {
            stocks.map(stock => {
              return <td key={UUID()}>{stock.dataset[0][4]}</td>
            })
          }
        </tr>
      </tbody></table>
    )
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <h1>Closing Prices</h1>
        {this.state.data ? this.renderRows() : "loading data..."}
      </div>
    );
  }
}

export default App;
