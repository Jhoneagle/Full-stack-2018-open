import React from 'react'

const main = (kurssi) => {
  return (
    <div>
      <Otsikko nimi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1> {props.nimi} </h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <ul>
      {props.osat.map((osa, i) => <li key={i}>{osa.nimi} {osa.tehtavia}</li>)}
    </ul>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteens‰ {props.osat.reduce(function(sum, osa) {return sum + osa.tehtavia}, 0)} teht‰v‰‰</p>
    </div>
  )
}

export default { main }