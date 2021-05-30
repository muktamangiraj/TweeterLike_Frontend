import axios from "axios";

// get all posts by id
export const getAllPostsById = (UserID) =>  {
  return axios
    .post("https://tweeterlike-backend.herokuapp.com/getAllPostsById", {UserID : UserID})
    .then(res => {
      
      // console.log(res.data);
      return res.data;
    })
    .catch(err =>
      console.log(err)
    );
};

// get all posts
export const getAllPosts = () =>  {
  return axios
    .get("https://tweeterlike-backend.herokuapp.com/getAllPosts")
    .then(res => {
      
      // console.log(res.data);
      return res.data;
    })
    .catch(err =>
      console.log(err)
    );
};

// add posts
export const addpost = postData =>{
  console.log("action");
  axios.create({
    baseURL: 'https://tweeterlike-backend.herokuapp.com/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });

  var axiosConfig = {
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'contentType' : "application/json",

                        // "Access-Control-Allow-Origin": "*",
                        'Accept': '*',
                    }
                };
  return axios.post("https://tweeterlike-backend.herokuapp.com/addpost", postData, axiosConfig)
                .then(res => {
                    
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // delete posts
  export const deletepost = postData =>{
  console.log("action");
  axios.create({
    baseURL: 'https://tweeterlike-backend.herokuapp.com/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });

  var axiosConfig = {
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'contentType' : "application/json",

                        // "Access-Control-Allow-Origin": "*",
                        'Accept': '*',
                    }
                };
  return axios.post("https://tweeterlike-backend.herokuapp.com/deletePost", postData, axiosConfig)
                .then(res => {
                    
      
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };