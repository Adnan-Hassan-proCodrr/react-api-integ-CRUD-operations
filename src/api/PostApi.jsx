import axios from "axios";
const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
});


// get method  GET => (CRUD)
export const getPost = () => {
    return api.get("/posts")
}  


// delete method  DELETE => (CRUD)

export const deletePost = (id)=>{
    return api.delete(`/posts/${id}`)
}



// post method to add new data /Post 

export const postData =  (post) =>{
    return api.post("/posts",post)
}