import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value} {props.erikoismerkki}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <p>No feedback given.</p>
    )
  }
  return (
  <div>
  <h2>Statistics</h2>
  <table>
    <tbody>
    <StatisticLine text='Good' value={props.good}/>
    <StatisticLine text='Neutral' value={props.neutral}/>
    <StatisticLine text='Bad' value={props.bad}/>
    <StatisticLine text='All' value={props.all}/>
    <StatisticLine text='Average' value={props.average}/>
    <StatisticLine text='Positive' value={props.positive * 100} 
    erikoismerkki='%'/>
    </tbody>
  </table>
  </div>)
}

const Button = (props) => {
  return (
<button onClick={props.handler}>{props.buttonText}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const goodReview = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(((good +1) - bad) / (all + 1))
    setPositive((good +1) / (all+1))
  }

  const neutralReview = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / (all + 1))
    setPositive(good / (all+1))
  }

  const badReview = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - (bad +1)) / (all + 1))
    setPositive(good / (all+1))
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handler={goodReview} buttonText='good'/>
      <Button handler={neutralReview} buttonText='neutral'/>
      <Button handler={badReview} buttonText='bad'/>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average}
      positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)