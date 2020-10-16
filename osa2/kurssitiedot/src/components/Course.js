import React from 'react'

const Total = ({course}) => {
//    console.log('total props are', course)
    return (
      <b><p>
        Total is {course.reduce(function(sum,part) {
        return sum + part.exercises
      }, 0)} exercises!
      </p></b>
    )
  }
  
  const Part = ({parts}) => {
//    console.log('part props are',parts)
    return (
      <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
    )
  }
  
  const Content = ({course}) => {
//    console.log('content props are', course)
    return (
  <div>
  <Part parts={course}/>
  </div>
    )
  }
  
  const Header = ({course}) => {
//    console.log('header props are', course)
    return (
        <h2>
          {course.name}
        </h2>
    )
  }
  
  const Course = ({courses}) => {
//    console.log('Course props are', courses)
    return (
      <>
      {courses.map(course =>
        <div key={course.id}>
        <Header course={course}/>
        <Content course={course.parts}/>
        <Total course={course.parts}/>
        </div>
      )}
      </>
    )
  }

export default Course