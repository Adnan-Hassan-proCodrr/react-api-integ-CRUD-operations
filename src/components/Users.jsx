import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../api/UserApi';
import Button from './Button';
import AddNewUser from './AddNewUser';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [updateUserData, setUpdateUserData] = useState({});

  // Get users from API
  const getTheUsers = async () => {
    const response = await getUsers();
    setUsers(response.data.users);
  };

  useEffect(() => {
    getTheUsers();
  }, []);

  // Delete user
  const handleDeleteTheUser = async (id) => {
    const response = await deleteUser(id);
    if (response.status === 200) {
      const newUpdatedUsers = users.filter((curUser) => curUser.id !== id);
      setUsers(newUpdatedUsers);
    }
  };

  return (
    <>
      <AddNewUser 
        users={users} 
        setUsers={setUsers}
        updateUserData={updateUserData} 
        setUpdateUserData={setUpdateUserData}
      />

      <div className='users-container'>
        {users.map((user) => (
          <div className='user-card' key={user.id}>
            <div className="image">
              <img src={user.image} alt={user.firstName} />
            </div>
            
            <h3>
              <i><span>userName</span></i>: {user.username}
            </h3>
            
            <i><span>FirstName</span>: {user.firstName}</i><br/>
            <i><span>LastName</span>: {user.lastName}</i>
            
            <div className="btns">
              <Button 
                btnText="Edit-User" 
                id="edit-btn" 
                onClick={() => setUpdateUserData(user)}  
              /> 
              <Button 
                btnText="Delete-User" 
                id="del-btn" 
                onClick={() => handleDeleteTheUser(user.id)} 
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
