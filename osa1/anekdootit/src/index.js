import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVotes = (props) => {
  if (props.mostVotes === 0) {
    return (
    <p>No votes have been given yet.</p>
    )
  }
  return (
    <>
    <p>{props.anecdotes[props.indexOfMostVotes]}</p>
    <p>has {props.mostVotes} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const mostVotes = Math.max(...votes)
  const indexOfMostVotes = votes.indexOf(Math.max(...votes))
  console.log(votes)
  console.log(mostVotes)
  console.log(indexOfMostVotes)

  const handleRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random()*anecdotes.length);
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day!</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes</p>
    <button onClick={handleVote}>Vote</button>
    <button onClick={handleRandomAnecdote}>Select random anecdote</button>
    <h2>Anecdote with the most votes:</h2>
    <MostVotes anecdotes={props.anecdotes}
    mostVotes={mostVotes}
    indexOfMostVotes={indexOfMostVotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)