import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      keskiarvo: 0,
      positiivisia: 0,
      kaikki: 0,
      tyhja: true
    };
    
    setInterval(() => {
      this.setState({
        keskiarvo: (this.state.hyva - this.state.huono) / this.state.kaikki,
        positiivisia: this.state.hyva / this.state.kaikki
      })
    }, 1000)
  }
  
  newValue = (nappula) => {
    if (nappula === 1) {
      return () => {
        this.setState({ 
	  hyva: this.state.hyva + 1,
	  kaikki: this.state.kaikki + 1,
	  tyhja: false
	})
      }
    } else if (nappula === -1) {
      return () => {
        this.setState({
	  huono: this.state.huono + 1,
	  kaikki: this.state.kaikki + 1,
	  tyhja: false
	})
      }
    } else {
      return () => {
        this.setState({
	  neutraali: this.state.neutraali + 1,
	  kaikki: this.state.kaikki + 1,
	  tyhja: false
	})
      }
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <h1>
	    Anna Palautetta
	  </h1>
	  
	  {this.newStats}
	  
	  <Button
            handleClick={this.newValue(1)}
            text="hyva"
          />
	  <Button
            handleClick={this.newValue(0)}
            text="neutraali"
          />
	  <Button
            handleClick={this.newValue(-1)}
            text="huono"
          />
	  
	  <br />
	  
	  <h2>
	    Statistiikka
	  </h2>
	  
	  <Statics table={this.state} />
        </div>
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Line = ({ name, value, add }) => {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {value} {add}
      </td>
    </tr>
  )
}

const Statics = ({ table }) => {
  if (table.tyhja) {
    return (
      <p>
        ei tilasto  tietoja
      </p>
    )
  } else {
    return (
      <table>
        <tbody>
          <Line name='hyva' value={table.hyva} />
          <Line name='neutraali' value={table.neutraali} />
          <Line name='huono' value={table.huono} />
          <Line name='keskiarvo' value={table.keskiarvo} />
          <Line name='positiivisia' value={table.positiivisia} add='%' />
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
