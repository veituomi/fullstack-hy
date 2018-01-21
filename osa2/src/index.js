import React from 'react'
import ReactDOM from 'react-dom'

const Osa = ({ osa }) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Otsikko = ({ kurssi }) => 
  <h1>{kurssi.nimi}</h1>

const Sisalto = ({ osat }) =>
  <div>
    {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
  </div>

const Yhteensa = ({ osat }) =>
  <p>yhteensä {osat.reduce((a, b) => a + b.tehtavia, 0)} tehtävää</p>

const Kurssi = ({ kurssi }) =>
  <div>
    <Otsikko kurssi={kurssi}/>
    <Sisalto osat={kurssi.osat}/>
    <Yhteensa osat={kurssi.osat}/>
  </div>

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi}/>)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
