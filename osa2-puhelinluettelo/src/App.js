import React from 'react'
import Notification from './Notification'
import Numbers from './Numbers'
import AddPerson from './AddPerson'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      messages: []
    }
  }

  componentWillMount() {
    personService.getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  removeNotification = () => {
    const messages = this.state.messages.map(m => m)
    messages.shift()
    this.setState({ messages: [] })
    this.setState({ messages })
  }

  notifyUser = (message) => {
    const messages = this.state.messages.map(m => m)
    messages.push(message)
    console.log(messages)
    this.setState({ messages })
    setTimeout(() => {
      this.removeNotification()
    }, 5000)
  }

  postPerson(person) {
    personService.create(person)
      .then(response => {
        this.addPerson(response)  
      })
  }

  confirmDelete = (id) => 
    window.confirm('Poistetaanko ' +
      this.state.persons.find(
        person => person.id === id
      ).name + '?')

  deletePerson = (personId) => {
    if (this.confirmDelete(personId)) {
      personService.remove(personId)
        .then(response => {
          this.removePerson(personId)
        })
    }
  }

  confirmChange = (id) => 
  window.confirm('Päivitetäänkö numero henkilölle ' +
    this.state.persons.find(
      person => person.id === id
    ).name + '?')

  changePerson = (personId, person) => {
    if (this.confirmChange(personId)) {
      personService.update(personId, person)
        .then(response => this.updatePerson({
          ...person,
          id: personId
        }))
    }
  }

  removePerson = (removable) => {
    this.setState({
      persons: this.state.persons
        .filter(person => person.id !== removable)
    })
    this.notifyUser('Poistettiin henkilö!')
  }

  updatePerson = (person) => {
    const persons = this.state.persons
    this.setState({ persons: [] }) // Ei päivittynyt ilman
    this.setState({
      persons: persons.map(p =>
        (person.name !== p.name) ? p : person)
    })
    this.notifyUser('Päivitettiin ' + person.name + '!')
  }

  addPerson = (person) => {
    this.setState({
      persons: [...this.state.persons, person]
    })
    this.notifyUser('Lisättiin ' + person.name + '!')
  }

  getPersonId = (name) =>
    this.state.persons.find(person => person.name === name).id

  nameExists = (name) => {
    return this.state.persons
      .some(person => person.name === name)
  }

  submitPerson = (event) => {
    event.preventDefault()
    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if (this.nameExists(person.name)) {
      this.changePerson(this.getPersonId(person.name), person)
      return
    }
    this.postPerson(person)
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
        {this.state.messages.map(message =>
          <Notification message={message}/>)}
        rajaa hakua: <input
          value={this.state.filter}
          onChange={this.handleFilterChanged}/>
        <AddPerson
          onSubmit={this.submitPerson}
          onNameChanged={this.handleNameChanged}
          onNumberChanged={this.handleNumberChanged}/>
        <Numbers
          persons={() => this.state.persons}
          filter={() => this.state.filter}
          onRemove={this.deletePerson}/>
      </div>
    )
  }
}

export default App
