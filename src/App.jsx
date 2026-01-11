import React from 'react'
import Post from './components/Post'
import Users from './components/Users'

const App = () => {

  return (
    <>
      <h1>React FULL STACK</h1>
      <p>Intergrating Api in React js</p>
      <ol>
      <li>Post</li>
      <li>Get</li>
      <li>Put</li>
      <li>Delete</li>
      </ol>
      <hr />

      <Post/>

      <hr />
      <h2>handling User with CRUD</h2>
      <hr />
      <Users/>

    </>
  )
}

export default App
