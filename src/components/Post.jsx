import React, { useEffect, useState } from 'react'
import { getPost } from '../api/PostApi';
import Button from './Button';

const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getPostData();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className='container'>
      {data.map((item) => (
        <div key={item.id} className='card'>
          <div className="card-num">{item.id}</div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>

          <div className="btns">
            <Button btnText="Edit" id="edit-btn" />
            <Button btnText="Delete" id="del-btn" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
