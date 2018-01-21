import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
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
        name: this.state.newName
      }]
    })
  }

  handleNameChanged = (event) => {
    this.setState({
      newName: event.target.value
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
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App
