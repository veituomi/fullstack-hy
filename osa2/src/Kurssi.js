import React from 'react'

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

export default Kurssi
