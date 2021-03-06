import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Image, Navbar, NavItem, Nav, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Notifications from './components/Notifications'

const navlinkActive = {
  background: 'black',
  color: 'white',
  textDecoration: 'none'
}

const navigation = [
  { route: '/', label: 'anecdotes' },
  { route: '/create', label: 'create new' },
  { route: '/about', label: 'about' },
]

const Menu = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        Anecdote app
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {
          navigation.map(item =>
            <NavItem href="#">
              <Link to={item.route}>{item.label}</Link>
            </NavItem>
          )
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => {
        const url = `/anecdotes/${anecdote.id}`
        return <ListGroupItem key={anecdote.id} >
          <Link to={url}>
            {anecdote.content}
          </Link>
        </ListGroupItem>
      })}
    </ListGroup>  
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
          <FormGroup>
            <ControlLabel>content:</ControlLabel>
            <FormControl
              type='text'
              name='content'
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel>author:</ControlLabel>
            <FormControl
              type='text'
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>url for more info:</ControlLabel>
            <FormControl
              type='text'
              name='info'
              value={this.state.info}
              onChange={this.handleChange}
            />
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
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
          <Grid>
            <Row className="show-grid">
              <Col md={8} xs={8}>
                <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                <Route exact path="/anecdotes/:id" render={({match}) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
                />
                <Route path="/create" render={() =>
                  <CreateNew pushNotification={this.pushNotification} addNew={this.addNew}/>
                }/>
                <Route path="/about" render={() => <About />} />
              </Col>
              <Col md={4} xs={4}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/BjarneStroustrup.jpg/300px-BjarneStroustrup.jpg" />
              </Col>
            </Row>
          </Grid>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
