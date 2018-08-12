import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  handleClick(country) {
    return () => {
        this.setState({ filter: country.name })
    }
    
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }
  
  render() {
    const countriesToShow = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    
    if (countriesToShow.length > 10) {
      return (
	<div>
		<h2>Maa luettelo</h2>
		
		<div>
			etsi maita: <input 
			    value={this.state.filter}
			    onChange={this.handleFilterChange}
			/>
		</div>
		<div>
			tarkenna hakua!
		</div>
	</div>
      )
    } else if (countriesToShow.length === 1) {
      return (
	<div>
		<h2>Maa luettelo</h2>
		
		<div>
			etsi maita: <input 
			    value={this.state.filter}
			    onChange={this.handleFilterChange}
			/>
		</div>
		
		<div>
			<p> {countriesToShow[0].name} </p>
			
			<p> {countriesToShow[0].capital} </p>
			
			<p> {countriesToShow[0].population} </p>
			
			<img alt='flag' src={countriesToShow[0].flag} />
		</div>
	</div>
      )
    } else {
      return (
	<div>
		<h2>Maa luettelo</h2>
		
		<div>
			etsi maita: <input 
			    value={this.state.filter}
			    onChange={this.handleFilterChange}
			/>
		</div>
		<div>
			{countriesToShow.map((country, i) => <div><button onClick={this.handleClick(country)} key={i}> {country.name} </button></div>)}
		</div>
	</div>
      )
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)