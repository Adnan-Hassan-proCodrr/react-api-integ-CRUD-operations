import axios from "axios";


// base path of the The you API
const userApi = axios.create({
    baseURL : "https://dummyjson.com"
});


// GET METHOD => getting / fetching get all users


export  const getUsers = ()=>{
    return userApi.get("/users")
}

// DELETE METHOD => delete the user

export const deleteUser = (id) =>{

    return userApi.delete(`/users/${id}`)
}




// post method To add nEw user in list

export const createUser = ( user) =>{
return  userApi.post("/users/add",user)
}
