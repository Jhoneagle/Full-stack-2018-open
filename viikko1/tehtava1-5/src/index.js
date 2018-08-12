import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonv‰litys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }
  
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa part={props.osat[0]} />
      <Osa part={props.osat[1]} />
      <Osa part={props.osat[2]} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.part.nimi} {props.part.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteens‰ {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} teht‰v‰‰</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
