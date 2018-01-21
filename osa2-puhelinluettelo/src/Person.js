import React from 'react'

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.person = props.person
    this.remove = props.onRemove
  }

  render = () =>
    <tr>
      <td>{this.person.name}</td>
      <td>{this.person.number}</td>
      <td>
        <button onClick={() => this.remove(this.person.id)}>
          poista
        </button>
      </td>
    </tr>
}

export default Person
