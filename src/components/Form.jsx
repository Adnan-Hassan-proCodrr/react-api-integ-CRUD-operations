import React, { useState } from 'react'
import Button from './Button'
import { postData } from '../api/PostApi';
const Form = ({data,setData}) => {

    const [addData,setAddData] = useState({
        title : "",
        body :""
    });

// handling input change by changing its values
    let handleInputChange  = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    // setAddData inputs values
    setAddData((pre)=>{
        return {
            ...pre,
            [name] : value,
        }
    })
    }

    // addPostData 
  const addPostData = async () => {
  const response = await postData(addData);

  if (response.status === 201) {

    // create unique post with unique ID
    const newPost = {
      ...response.data,
      id: Date.now()  
    };

    // add to data
    setData([...data, newPost]);
  }

  // reset form
  setAddData({
    title: "",
    body: ""
  });
};


// handleSumbit form
let handleSumbit = (e)=>{
    e.preventDefault();
    addPostData();
}



  return (
    <section className='form-section'>
      <form onSubmit={handleSumbit}>
      <input 
      type="text"
      value={addData.title}
      name='title'
       placeholder='title...' 
       onChange={handleInputChange}
       />

      <input
       type="text"
        placeholder='body...' 
        value={addData.body}
        name='body'
        onChange={handleInputChange}
        />
      <Button btnText="Add User" id="add-btn" type="submit"/>
      </form>
    </section>
  )
}

export default Form
