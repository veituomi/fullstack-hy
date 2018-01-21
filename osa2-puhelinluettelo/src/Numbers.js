import React from 'react'
import Person from './Person'

class Numbers extends React.Component {
  constructor(props) {
    super(props)
    this.persons = props.persons
    this.filter = props.filter
    this.onRemove = props.onRemove
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
                  <Person
                    key={person.name}
                    person={person}
                    onRemove={this.onRemove}/>)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Numbers
