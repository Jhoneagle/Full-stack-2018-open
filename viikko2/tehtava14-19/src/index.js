import React from 'react'
import ReactDOM from 'react-dom'
import personService from './person'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addName = (event) => {
    event.preventDefault()
    const newPerson = { name: this.state.newName, number: this.state.newNumber }
    const filterList = this.state.persons.filter(p => (p.name === newPerson.name))
    
    if ( filterList.length === 0 ) {
	 personService
	    .create(newPerson)
	    .then(response => {
	        this.setState({
		  persons: this.state.persons.concat(response.data),
		  newName: '',
		  newNumber: '',
		  error: 'muistiinpanon lisäys onnistui'
	        })
		setTimeout(() => {
		    this.setState({error: ''})
		  }, 5000)
	    })
    } else {
      const id = filterList[0].id
    
      personService
	      .update(id, newPerson)
	      .then(response => {
	        personService
		      .getAll()
		      .then(response => {
			this.setState({ 
				persons: response.data,
				newName: '',
				newNumber: '',
				error: 'muistiinpanon päivitys onnistui'
			})
			setTimeout(() => {
			    this.setState({error: ''})
			}, 5000)
		      })
		})
	      .catch(error => {
		this.setState({ 
			error: 'muistiinpano ' + newPerson.name + ' on jo valitettavasti poistettu palvelimelta',
			persons: this.state.persons.filter(p => p.id !== id) 
		})
		setTimeout(() => {
		    this.setState({error: ''})
		}, 5000)
	      })
    }
  }

  handleClick(person) {
    return () => {
        personService
	    .del(person.id)
	    .then(response => {
	        personService
		      .getAll()
		      .then(response => {
			this.setState({ 
				persons: response.data,
				error: 'muistiinpanon poistaminen onnistui' 
			})
			setTimeout(() => {
			    this.setState({error: ''})
			}, 5000)
		      })
	    })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }
  
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  
    return (
      <div>
        <h2>Puhelinluettelo</h2>
	
	<Notification message={this.state.error}/>
	
	<div>
            rajaa näytettäviä: <input 
		    value={this.state.filter}
		    onChange={this.handleFilterChange}
		  />
	</div>
	
	<h2>Lisää uusi</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input 
		    value={this.state.newName}
		    onChange={this.handleNameChange}
		  />
          </div>
	  <div>
	    numero: <input 
		      value={this.state.newNumber}
		      onChange={this.handleNumberChange}
		    />
	  </div>
          <div>
            <button type="submit">lisaa</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
		<tbody>
			{personsToShow.map((person, i) => <Line key={i} person={person} click={this.handleClick(person)} />)}
	        </tbody>
	</table>
      </div>
    )
  }
}     

const Line = ({ person, click }) => {
  return (
    <tr>
      <td>
        {person.name}
      </td>
      <td>
        {person.number}
      </td>
      <td>
        <button onClick={click}> poista </button>
      </td>
    </tr>
  )
}

const Notification = ({ message }) => {
  if (message === '') {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)