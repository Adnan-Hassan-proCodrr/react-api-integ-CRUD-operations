import React, { useState } from 'react'
import Button from './Button'
import { createUser } from '../api/UserApi'

const AddNewUser = ({ users, setUsers }) => {

  const [addUser, setAddUser] = useState({
    image: "",
    username: "",
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addUser.image || !addUser.username || !addUser.firstName || !addUser.lastName) {
      alert("Please fill all fields");
      return;
    }

    const response = await createUser(addUser)

    if (response.status === 201 || response.status === 200) {
      const newUser = {
        ...addUser,       // keep all form values
        ...response.data, // merge API returned fields
        id: Date.now()    // unique ID
      }

      setUsers([...users, newUser])
    }

    setAddUser({
      image: "",
      username: "",
      firstName: "",
      lastName: ""
    })
  }

  return (
    <section className='add-user-section'>
      <form onSubmit={handleSubmit}>

        <input
          name="image"
          value={addUser.image}
          placeholder='Image URL'
          onChange={handleInputChange}
        />

        <input
          name="username"
          value={addUser.username}
          placeholder='Username'
          onChange={handleInputChange}
        />

        <input
          name="firstName"
          value={addUser.firstName}
          placeholder='First Name'
          onChange={handleInputChange}
        />

        <input
          name="lastName"
          value={addUser.lastName}
          placeholder='Last Name'
          onChange={handleInputChange}
        />

        <Button type="submit" btnText="Add User" id="add-btn" />
      </form>
    </section>
  )
}

export default AddNewUser
