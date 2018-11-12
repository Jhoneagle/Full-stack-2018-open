import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = ({good, neutral, bad}) => {
  const palautteita = good + neutral + bad
  const keskiarvo = palautteita !== 0 ? good - bad / palautteita : null
  const positiivisia = palautteita !== 0 ? good / palautteita : null

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yht‰‰n palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyv‰</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    const {good, bad, ok} = store.getState()
    
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyv‰</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka good={good} neutral={ok} bad={bad}/>
      </div>
    )
  }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)