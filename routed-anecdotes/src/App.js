import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Notifications from './components/Notifications'

const Menu = () => (
  <div>    
    <Link to="/">anecdotes</Link>&nbsp;
    <Link to="/create">create new</Link>&nbsp;
    <Link to="/about">about</Link>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        const url = `/anecdotes/${anecdote.id}`
        return <li key={anecdote.id} >
          <Link to={url}>
            {anecdote.content}
          </Link>
        </li>
      })}
    </ul>  
  </div>
)

const Anecdote = ({ anecdote }) => {
  if (anecdote === undefined) {
    return <Redirect to="/" />
  }
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>author: {anecdote.author}</div>
      <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.pushNotification({
      content: `a new anecdote ${this.state.content} created!`,
      buttons: [
        {
          label: 'OK',
          callback: () => void 0
        }
      ]
    })
    this.setState({
      redirect: `/anecdotes/${id}`
    })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
        {
          this.state.redirect ? <Redirect to={this.state.redirect} /> : <span/>
        }
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  pushNotification = () => void 0

	subscribeNotifications = (callback) => {
		this.pushNotification = callback
	}

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    return anecdote.id
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Notifications subscribe={this.subscribeNotifications} />
          <Menu />
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Route path="/create" render={() =>
            <CreateNew pushNotification={this.pushNotification} addNew={this.addNew}/>
          }/>
          <Route path="/about" render={() => <About />} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
