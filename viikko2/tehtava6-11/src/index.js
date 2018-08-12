import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addName = (event) => {
    event.preventDefault()
    const newPerson = { name: this.state.newName, number: this.state.newNumber }
    const personList = this.state.persons.concat(newPerson)
    
    if ( this.state.persons.filter(p => (p.name === newPerson.name)).length === 0 ) {
	this.setState({
	  persons: personList,
          newName: '',
          newNumber: ''
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
	
	<div>
            rajaa n√§ytett√§vi√§: <input 
		    value={this.state.filter}
		    onChange={this.handleFilterChange}
		  />
	</div>
	
	<h2>Lis‰‰ uusi</h2>
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
			{personsToShow.map((person, i) => <Line key={i} name={person.name} number={person.number} />)}
	        </tbody>
	</table>
      </div>
    )
  }
}     

const Line = ({ name, number }) => {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {number}
      </td>
    </tr>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)