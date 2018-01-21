import React from 'react'
import Person from './Person'

class Numbers extends React.Component {
  constructor(props) {
    super(props)
    this.persons = props.persons
    this.filter = props.filter
  }

  render() {
    const personFilter = (person) => {
      return person.name
        .toLowerCase()
        .includes(this.filter().toLowerCase())
    }

    return (
      <div>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {
              this.persons()
                .filter(personFilter)
                .map(person =>
                  <Person key={person.name} person={person}/>)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Numbers
