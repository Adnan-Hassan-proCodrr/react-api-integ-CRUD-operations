import React, { useState, useEffect } from 'react';
import Button from './Button';
import { postData, updatePost } from '../api/PostApi';

const Form = ({ data, setData, updateData, setUpdateData }) => {

  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

  // 🟢 If updateData has values → put in form
  useEffect(() => {
    if (updateData.id) {
      setAddData({
        title: updateData.title,
        body: updateData.body,
      });
    }
  }, [updateData]);

  // 🔵 Handle input changes
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  // 🟢 Add New Post
  const addPostData = async () => {
    const response = await postData(addData);

    if (response.status === 201) {
      const newPost = {
        ...response.data,
        id: Date.now()
      };

      setData([...data, newPost]);
    }

    resetForm();
  };

  // 🟣 Update Existing Post
  const updatePostData = async () => {
    const response = await updatePost(updateData.id, addData);

    if (response.status === 200) {
      const updatedList = data.map((item) =>
        item.id === updateData.id ? response.data : item
      );

      setData(updatedList);
      setUpdateData({}); // clear edit mode
    }

    resetForm();
  };

  // 🔵 Reset form fields
  const resetForm = () => {
    setAddData({
      title: "",
      body: ""
    });
  };

  // 🔵 Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (updateData.id) {
      updatePostData(); // UPDATE MODE
    } else {
      addPostData();    // ADD MODE
    }
  };


  return (
    <section className='form-section'>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="title"
          value={addData.title}
          placeholder="title..."
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="body"
          value={addData.body}
          placeholder="body..."
          onChange={handleInputChange}
        />

        <Button 
          btnText={updateData.id ? "Update Post" : "Add Post"} 
          id="add-btn" 
          type="submit" 
        />

      </form>
    </section>
  );
};

export default Form;
