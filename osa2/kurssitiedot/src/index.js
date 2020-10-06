import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
    {
  name: 'Half Stack application development',
  id: 1,
  parts: [ 
  {
    name: 'Fundamentals of React',
    exercises: 10,
    id: 1
  },
  { 
    name: 'Using props to pass data',
    exercises: 7,
    id: 2
  },
  {
    name: 'State of a component',
    exercises: 14,
    id: 3
  },
  {
    name: 'Modules',
    exercises: 8,
    id: 4
  },
  {
    name: 'Very cool stuff',
    exercises: 65,
    id: 5
  }
]
},
{
  name: 'Node.js',
  id: 2,
  parts: [
    {
      name: 'Routing',
      exercises: 3,
      id: 1
    },
    {
      name: 'Middlewares',
      exercises: 7,
      id: 2
    }
  ]
},
{
  name: 'Absolute magic',
  id: 3,
  parts: [
    {
      name: 'Maps are awesome',
      exercises: 7,
      id: 1
    },
    {
      name: 'Reduce is pretty cool too',
      exercises: 18,
      id: 2
    }
  ]
}
]

console.log('app contains array', courses)

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))