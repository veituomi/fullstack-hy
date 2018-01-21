import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '123-123456' }
      ],
      newName: '',
      newNumber: ''
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

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.newName}
              onChange={this.handleNameChanged}/>
          </div>
          <div>
            numero: <input
              value={this.newNumber}
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
              this.state.persons.map(person =>
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
