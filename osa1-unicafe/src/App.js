import React, { Component } from 'react';

const Statistiikka = (props) => {
  return (
    <div>
      hyvä: {props.tiedot.hyva}<br/>
      neutraali: {props.tiedot.neutraali}<br/>
      huono: {props.tiedot.huono}<br/>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  hyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  neutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }

  huono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  render() {
    const palautteet = () => {
      return (
        <Statistiikka tiedot={this.state}/>
      )
    }

    return (
      <div>
        <h1>anna palautetta</h1>
        <button onClick={this.hyva}>hyvä</button>
        <button onClick={this.neutraali}>neutraali</button>
        <button onClick={this.huono}>huono</button>
        <h1>statistiikka</h1>
        <div>{palautteet()}</div>
      </div>
    );
  }
}

export default App;
