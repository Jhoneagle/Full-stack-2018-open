import React from 'react'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, Navbar, Nav, NavItem, Well, Grid, Col, Row, Image, Jumbotron } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"
import { Container } from 'semantic-ui-react'
import './index.css'

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
        <LinkContainer to="/">
	  <NavItem>home</NavItem>
	</LinkContainer>
	<LinkContainer to="/about">
	  <NavItem>about</NavItem>
	</LinkContainer>
	<LinkContainer to="/create">
	  <NavItem>create</NavItem>
	</LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <Grid>
    <Row>
      <h2>About anecdote app</h2>
      <br />
    </Row>
    <Row>
      <p>According to Wikipedia:</p>
    </Row>
    <Row>
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      <br />
    </Row>
    <Row>
      <Col xs={6} md={5} className="em">
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>
      </Col>
      <Col xs={6} md={5}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg" responsive circle />
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <Well>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </Well>
)

const Anecdote = ({ anecdote }) => {
  return (
    <Jumbotron>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div> has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </Jumbotron>
  )
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

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'Lisäys onnistui!'
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) => {
    return this.state.anecdotes.find(a => a.id === id)
  }
  
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
      <Container>
        <Notification message={this.state.notification}/>
	
        <Router>
	  <div>
	    <Menu />
	  
	    <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/about" render={() => <About />} />
	    <Route path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history}/>} />
	    <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
	  </div>
        </Router>
	
	<p />
        <Footer />
      </Container>
    )
  }
}

export default App;
