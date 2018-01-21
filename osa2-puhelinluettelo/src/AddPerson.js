import React from 'react';

class AddPerson extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = props.onSubmit
    this.handleNameChanged = props.onNameChanged
    this.handleNumberChanged = props.onNumberChanged
  }

  render() {
    return (
      <div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.onSubmit}>
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
      </div>
    )
  }
}

export default AddPerson
