import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  return (
  <div>
  <h2>Statistics</h2>
  <ul>
  <li>Good: {props.good}</li>
  <li>Neutral: {props.neutral}</li>
  <li>Bad: {props.bad}</li>
  <li>All: {props.all}</li>
  <li>Average: {props.average}</li>
  <li>Positive: {props.positive * 100} %</li>
  </ul>
  </div>)
}

const App = () => {
  // tallenna napit omaan tilaansa
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
      <button onClick={goodReview}>good</button>
      <button onClick={neutralReview}>neutral</button>
      <button onClick={badReview}>bad</button>
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