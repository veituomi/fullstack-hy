import React from 'react'
import ReactDOM from 'react-dom'

const Osa = ({ osa }) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi.nimi}</h1>
  )
}

const Sisalto = ({ osat }) =>
  <div>
    {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
  </div>

const Yhteensa = (props) => {
  return (
    <p>yhteensä {props.osat.reduce((a, b) => a + b.tehtavia, 0)} tehtävää</p>
  )
}

const Kurssi = ({ kurssi }) =>
  <div>
    <Otsikko kurssi={kurssi.nimi}/>
    <Sisalto osat={kurssi.osat}/>
  </div>

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
