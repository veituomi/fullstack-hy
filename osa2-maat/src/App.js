import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      info: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChanged = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    const countries = this.state.countries.filter(country =>
      country.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    const tooMany = 
      <div>Too many results.</div>

    const notEnough = 
    <div>No results.</div>

    const list = () => countries.map(country =>
      <div key={country.name}>{country.name}</div>)

    const view = () => countries.map(country =>
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} alt={'flag of ' + country.name}/>
      </div>)

    const display =
      (countries.length > 10 && tooMany) ||
      (countries.length > 1 && list()) ||
      (countries.length == 1 && view()) ||
      notEnough

    return (
      <div>
        find countries:
        <input
          value={this.state.filter}
          onChange={this.handleFilterChanged}/>
        {display}
      </div>
    )
  }
}

export default App;
