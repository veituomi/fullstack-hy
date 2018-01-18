import React, { Component } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.label}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {hyva, neutraali, huono} = props.tiedot
  const lukumaara = hyva + neutraali + huono
  const keskiarvo = (hyva - huono) / lukumaara
  const positiivisia = hyva / lukumaara

  if (lukumaara === 0) {
    return (
      <div>yhtään palautetta ei ole annettu</div>
    )
  } 

  return (
    <table>
      <tbody>
        <Statistic label='hyvä' value={hyva}/>
        <Statistic label='neutraali' value={neutraali}/>
        <Statistic label='huono' value={huono}/>
        <Statistic label='keskiarvo' value={keskiarvo.toFixed(2)}/>
        <Statistic label='positiivisia' value={(positiivisia * 100).toFixed(1) + ' %'}/>
      </tbody>
    </table>
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

  clickHandler = (hyva, neutraali, huono) => () => {
    this.setState({
      hyva: this.state.hyva + hyva,
      neutraali: this.state.neutraali + neutraali,
      huono: this.state.huono + huono
    })
  }

  render() {
    const palautteet = () => {
      return (
        <Statistics tiedot={this.state}/>
      )
    }

    return (
      <div>
        <h1>anna palautetta</h1>
        <Button handler={this.clickHandler(1, 0, 0)} label='hyvä'/>
        <Button handler={this.clickHandler(0, 1, 0)} label='neutraali'/>
        <Button handler={this.clickHandler(0, 0, 1)} label='huono'/>
        <h1>statistiikka</h1>
        <div>{palautteet()}</div>
      </div>
    );
  }
}

export default App;
