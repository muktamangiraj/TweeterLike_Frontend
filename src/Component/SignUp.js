import React, { Component } from 'react';
import "../CSS/SignUp.css"
import * as actions from '../Action/UserAction';
import SignUpValidation from "../validations/SignUpValidation";
import background from '../image.png'

class  SignUp extends Component {

    constructor(props) {
    super(props);

    this.state = {
      errors: {},
      errorP : "",
      hidden: true,
      hidden1: true,
      Name:"",
      Email:"",
      Password: "",
      ConfirmPassword:""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.togglePasswordShow = this.togglePasswordShow.bind(this);
    this.toggleConfirmPasswordShow = this.toggleConfirmPasswordShow.bind(this);
  }

  // password toggle
  handlePasswordChange(e) {
    this.setState({ Password: e.target.value });
  }
  handleConfirmPasswordChange(e) {
    this.setState({ ConfirmPassword: e.target.value });
  }
  togglePasswordShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  toggleConfirmPasswordShow() {
    this.setState({ hidden1: !this.state.hidden1 });
  }

  // On login button click
  onLoginClick(){
    this.props.history.push("/");
  }
  
  // input text
  onChange = e => {
    console.log("xxxxxxxxxxx");
    this.setState({ [e.target.id]: e.target.value});
    
  };
  
  // on create account click
  addSubmit = (e) =>{
    if(this.state.Password === this.state.ConfirmPassword){
      e.preventDefault();
      const newUser = {
        Name : this.state.Name,
        Email: this.state.Email,
        Password: this.state.Password
      };
      var UserData = SignUpValidation({
        Name: this.state.Name,
        Email: this.state.Email,
        Password: this.state.Password,
        ConfirmPassword: this.state.ConfirmPassword
      });
      if(UserData.isValid) {
        actions.addUserAction(newUser)
        .then(user => {
          if(user.message === "User already exists.")
          {
            alert("User already exists")
            this.props.history.push("/signUp");
          }
          else{
            alert("Added sucessfully")
            this.props.history.push("/");
          }
        });
      } else {
        this.setState({ errors: UserData.errors });
      }
    }else{
      this.setState({errorP : "Both passwords should be same"})
    }
  }


    componentDidMount() {
      if (this.props.password) {
        this.setState({ password: this.props.password });
      }
      if (this.props.confirmPassword) {
        this.setState({ confirmPassword: this.props.confirmPassword });
      }
    }

    render() {
      const { errorP } = this.state;
      const { errors } = this.state;
        return (
          <container>
          <div class ="position-relative">
            <img src ={background} class="img-fluid backgroundimg"></img> 
            <div class="topofimage">
            
                    <h1 class="headingSignup">TweetX</h1>
                    <div >
                        <button class="buttonSignupLogin"onClick={this.onLoginClick.bind(this)}>Login</button>
                    </div>
                    <div class="signupname">
                        <h1 >Sign Up</h1>
                    </div>

                    <form>
                        
                        <div class="inputContainerSignup">
                            <img src="https://img.icons8.com/windows/50/000000/employee-card.png" class="icon" alt=""/>
                            
                            <input 
                              class="Field form-control"
                              name = "textfield"
                              type="text" 
                              id="Name"
                              onChange={this.onChange}
                              value={this.state.Name}
                              placeholder="Name"></input>
                              <span style={{color:'red' }}>
                                {errors.Name}
                              </span>
                        </div>
                        <div class="inputContainer">
                            <img src="https://img.icons8.com/windows/32/000000/contacts.png" class="icon" alt=""/>
                            
                            <input 
                              class="Field" 
                              id="Email"
                              name = "textfield"
                              onChange={this.onChange}
                              value={this.state.Email} 
                              type="text" 
                              placeholder="Email"/>
                              <span style={{color:'red' }}>
                                {errors.Email}
                              </span>
                        </div>
                        <div class="inputContainer">
                            <img 
                                src="https://img.icons8.com/small/50/000000/visible.png" 
                                class="icon" 
                                onClick={this.togglePasswordShow}
                                alt=""
                                >
                            </img>
                            <input 
                                class="Field" 
                                placeholder="Password" 
                                autoComplete="on"
                                type={this.state.hidden ? "password" : "text"}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                             />
                             <span style={{color:'red' }}>
                                {errors.Password}
                              </span>
                        </div>
                        <div class="inputContainer">
                            <img 
                                src="https://img.icons8.com/small/50/000000/visible.png" 
                                class="icon" 
                                onClick={this.toggleConfirmPasswordShow}
                                alt=""
                                >
                            </img>
                            <input 
                                class="Field" 
                                placeholder="Confirm Password" 
                                autoComplete="on"
                                type={this.state.hidden1 ? "password" : "text"}
                                value={this.state.confirmPassword}
                                onChange={this.handleConfirmPasswordChange}
                             />
                             <span style={{color:'red' }}>
                              {errorP}
                            </span>
                            <span style={{color:'red' }}>
                              {errors.ConfirmPassword}
                            </span>
                        </div>
                        
                        <div >
                        
                            <button type="button" class="buttonSignup" onClick={this.addSubmit}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            </container>
        );
    }
}

export default SignUp;