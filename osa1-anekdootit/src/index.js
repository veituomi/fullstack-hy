import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdotes[props.selected]}<br/>
      has {props.votes[props.selected]} votes<br/>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: anecdotes.map(anecdote => 0)
    }
  }

  vote = () => {
    this.setState({
      votes: this.state.votes
        .map((id, i) => id + (i == this.state.selected ? 1 : 0))
    })
  }

  next = () => {
    this.setState({
      selected: Math.random() * anecdotes.length | 0
    })
  }

  render() {
    const max = this.state.votes
      .reduce((p, c, i) => {
        if (c > this.state.votes[p]) {
          return i
        }
        return p
      }, 0)

    return (
      <div>
        <Anecdote anecdotes={this.props.anecdotes}
          votes={this.state.votes}
          selected={this.state.selected}/>
        <button onClick={this.vote}>vote</button>
        <button onClick={this.next}>next anecdote</button>
        <h1>anecdote with most votes</h1>
        <Anecdote anecdotes={this.props.anecdotes}
          votes={this.state.votes}
          selected={max}/>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
