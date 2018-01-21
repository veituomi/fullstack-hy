import React from 'react'
import axios from 'axios'
import Numbers from './Numbers'
import AddPerson from './AddPerson'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
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
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        rajaa hakua: <input
          value={this.state.filter}
          onChange={this.handleFilterChanged}/>
        <AddPerson
          onSubmit={this.addPerson}
          onNameChanged={this.handleNameChanged}
          onNumberChanged={this.handleNumberChanged}/>
        <Numbers
          persons={() => this.state.persons}
          filter={() => this.state.filter}/>
      </div>
    )
  }
}

export default App
