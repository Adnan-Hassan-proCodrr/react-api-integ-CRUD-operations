import React, { useState, useEffect } from 'react'
import Button from './Button'
import { createUser, updateUser } from '../api/UserApi'

const AddNewUser = ({ users, setUsers, updateUserData, setUpdateUserData }) => {

  // Form state
  const [addUser, setAddUser] = useState({
    image: "",
    username: "",
    firstName: "",
    lastName: "",
  })

  // When edit mode starts → populate form
  useEffect(() => {
    if (updateUserData?.id) {
      setAddUser({
        image: updateUserData.image || "",
        username: updateUserData.username || "",
        firstName: updateUserData.firstName || "",
        lastName: updateUserData.lastName || "",
      })
    }
  }, [updateUserData])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAddUser(prev => ({ ...prev, [name]: value }))
  }

  // Reset form
  const resetForm = () => {
    setAddUser({
      image: "",
      username: "",
      firstName: "",
      lastName: "",
    })
    setUpdateUserData({}) // exit edit mode
  }

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!addUser.image || !addUser.username || !addUser.firstName || !addUser.lastName) {
      alert("Please fill all fields")
      return
    }

    // 🔹 UPDATE MODE
    if (updateUserData?.id) {
      try {
        const response = await updateUser(updateUserData.id, addUser)
        if (response.status === 200) {
          // Replace user in list
          const updatedUsers = users.map(u =>
            u.id === updateUserData.id ? response.data : u
          )
          setUsers(updatedUsers)
          resetForm()
        }
      } catch (error) {
        console.error("Error updating user:", error)
      }
      return
    }

    // 🔹 ADD MODE
    try {
      const response = await createUser(addUser)
      if (response.status === 201 || response.status === 200) {
        const newUser = {
          ...addUser,
          ...response.data,
          id: Date.now() // unique ID
        }
        setUsers([...users, newUser])
        resetForm()
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
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
        <Button
          type="submit"
          btnText={updateUserData?.id ? "Update User" : "Add User"}
          id="add-btn"
        />
      </form>
    </section>
  )
}

export default AddNewUser
