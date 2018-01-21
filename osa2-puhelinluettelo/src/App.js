import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  nameExists = (name) => {
    return this.state.persons
      .some(person => person.name === name)
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.nameExists(this.state.newName)) {
      return
    }
    this.setState({
      persons: [...this.state.persons, {
        name: this.state.newName,
        number: this.state.newNumber
      }]
    })
  }

  handleNameChanged = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNumberChanged = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  handleFilterChanged = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    const personFilter = (person) => {
      return person.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase())
    }

    return (
      <div>
        <h1>Puhelinluettelo</h1>
          rajaa hakua: <input
            value={this.state.filter}
            onChange={this.handleFilterChanged}/>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChanged}/>
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChanged}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {
              this.state.persons
                .filter(personFilter)
                .map(person =>
                  <tr key={person.name}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
