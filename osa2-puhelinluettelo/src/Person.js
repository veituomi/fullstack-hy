import React from 'react'

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.person = props.person
  }

  render = () =>
    <tr>
      <td>{this.person.name}</td>
      <td>{this.person.number}</td>
    </tr>
}

export default Person
