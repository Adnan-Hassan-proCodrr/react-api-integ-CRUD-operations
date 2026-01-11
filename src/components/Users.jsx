import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../api/UserApi';
import Button from './Button';

const Users = () => {

  const [users, setUsers] = useState([]);

  const getTheUsers = async () => {
    const response = await getUsers();
    setUsers(response.data.users);
  };

  useEffect(() => {
    getTheUsers();
  }, []);

  const handleDeletTheUser = async (id) => {
    const response = await deleteUser(id);

    if (response.status === 200) {
      const newUpdatedUsers = users.filter((curUser) => curUser.id !== id);
      setUsers(newUpdatedUsers);
    }
  };

  return (
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
            <Button btnText="Delete-User" id="del-btn" onClick={() => handleDeletTheUser(user.id)} />
            <Button btnText="Edit-User" id="edit-btn" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
