import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi';
import Button from './Button';
import Form from './Form';

const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // getPostData => getting all posts data
  const getPostData = async () => {
    try {
      setLoading(true);
      const response = await getPost();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect 
  useEffect(() => {
    getPostData();
  }, []);


  // deleteThePost => deleting a Post 
  const hanldleDeleteThePost = async (id) =>{
    const res = await deletePost(id);
    if(res.status === 200){
      const newUpdatedPosts = data.filter((curElem)=>{
        return curElem.id !== id;
      })
      setData(newUpdatedPosts);
    }
  }



// condition when data is not loaded!!!..

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }


// when data loaded successfully !!! 

  return (
<>
    <Form data = {data} setData={setData}/>
    <div className='container'>
      {data.map((item,idx) => (
        <div key={idx} className='card'>
          <div className="card-num">{idx+1}</div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>

          <div className="btns">
            <Button btnText="Edit" id="edit-btn" />
            <Button btnText="Delete" id="del-btn"  onClick={()=>hanldleDeleteThePost(item.id)}/>
          </div>
        </div>
      ))}
    </div>
    </>
  );



};

export default Post;
