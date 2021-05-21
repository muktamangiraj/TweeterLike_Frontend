import axios from "axios";

// Add User
export const addUserAction = userData =>{
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/addUser", userData, axiosConfig)
                .then(res => {
                    
      
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Login
  export const loginAction = userData =>{
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/login", userData, axiosConfig)
                .then(res => {
                    
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Forgot password Action
  export const forgotPasswordAction = User =>{
  console.log("action");
  console.log(User);
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/getPassword", User, axiosConfig)
                .then(res => {
                  console.log("response");
                    console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // All User
  export const getAllUser = () =>  {
  return axios
    .get("https://tweeterlike-backend.herokuapp.com/getAllUser")
    .then(res => {
      
      // console.log(res.data);
      return res.data;
    })
    .catch(err =>
      console.log(err)
    );
};

// Get user by id

export const GetUserByIDAction = _id =>{
  console.log("action");
  console.log(_id);
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/getUserById", {_id : _id}, axiosConfig)
                .then(res => {
                    
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // On Follow Click
  export const OnFollowClickAction = User =>{
  console.log("action");
  console.log(User);
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/AddFollowing", User, axiosConfig)
                .then(res => {
                  console.log("response");
                    console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Follower
  export const OnFollower = User =>{
  console.log("action");
  console.log(User);
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/AddFollower", User, axiosConfig)
                .then(res => {
                  console.log("response");
                    console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // On Follow Click
  export const OnUnFollowClickAction = User =>{
  console.log("action");
  console.log(User);
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/AddUnFollowing", User, axiosConfig)
                .then(res => {
                  console.log("response");
                    console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Follower
  export const OnUnFollower = User =>{
  console.log("action");
  console.log(User);
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
  return axios.post("https://tweeterlike-backend.herokuapp.com/AddUnFollower", User, axiosConfig)
                .then(res => {
                  console.log("response");
                    console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  };

