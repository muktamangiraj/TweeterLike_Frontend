import React, { Component } from 'react';
import "../CSS/Login.css"
import * as actions from '../Action/UserAction';
import LoginValidation from '../validations/LoginValidation';
import ForgotPasswordValidation from '../validations/ForgotPasswordValidation';
import ReactModal from 'react-modal';
import "../CSS/Feed.css";

class  Login extends Component {

    constructor(props) {
    super(props);

    this.state = {
        showModal: false,
        errors: {},        
        hidden: true,
        Password: "",
        Email : "",
        EmailPass : "",
        ResetPassword : "",
        error:{}
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  // Password show toggle button
  handlePasswordChange(e) {
    this.setState({ Password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  // Modal functions
  handleOpenModal (e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  // Forgot password
  forpass = (e) =>{
    e.preventDefault();
    const newUser = {
      Email: this.state.EmailPass,
    };
    console.log(newUser);
    var ForgotPasswordData = ForgotPasswordValidation({
      Email: this.state.EmailPass,
    });
    if(ForgotPasswordData.isValid) {
    actions.forgotPasswordAction(newUser)
      .then(user => {
        if(user.msg === "User not found.")
        {
          this.setState({
            ResetPassword : user.msg
          })
        }
        else{
          this.setState({
            ResetPassword : user.data
          })
        }
      });
    } else {
      this.setState({ error: ForgotPasswordData.errors });
    }
  }

  // On text input
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value});
  };

  // Login API
  onSubmit(e){
    e.preventDefault();
    const loginUser = {
      Email: this.state.Email,
      Password: this.state.Password
    };
    var UserData = LoginValidation({
      Email: this.state.Email,
      Password: this.state.Password,
    });
    if(UserData.isValid) {
      actions.loginAction(loginUser).then(response => {
        if(response.msg === "You are successfully logged in.")
        {
          this.props.history.push({
            pathname: '/feed',
            state: { detail: response.data }
          });
        }
        else{
          alert(response.msg)
          this.props.history.push("/");
        }
      })
    } else {
      this.setState({ errors: UserData.errors });
    }
  }

  // On create account button click
  onCreateClick(){
    this.props.history.push("/signUp");
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  render() {
    const { errors } = this.state;
    const { error } = this.state;
    const { ResetPassword } = this.state;
    return (
      <div class="bodyLogin">
        <div class="mainDivLogin">
            <h1 class="headingLogin">TweetX</h1>
                <div >
                  <button class="buttonCreateAccountLogin" onClick={this.onCreateClick.bind(this)}>Create Account</button>
                </div>
                <div class="loginname">
                  <h1 >Login</h1>
                </div>
                <form>
                  <div class="inputContainer">
                    <img src="https://img.icons8.com/windows/32/000000/contacts.png" class="icon" alt =""/>
                    <input  class="Field" 
                            type="text" 
                            placeholder="Email"
                            id="Email"
                            name = "textfield"
                            onChange={this.onChange}
                            value={this.state.Email} 
                    />
                    <span style={{color:'red' }}>
                      {errors.Email}
                    </span>
                  </div>
                  <div class="inputContainer">
                    <img 
                      src="https://img.icons8.com/small/50/000000/visible.png" 
                      class="icon" 
                      onClick={this.toggleShow}
                      alt=""
                    >
                    </img>
                    <input  class="Field" 
                            placeholder="Password" 
                            type={this.state.hidden ? "password" : "text"}
                            value={this.state.Password}
                            onChange={this.handlePasswordChange}
                    />
                    <span style={{color:'red' }}>
                          {errors.Password}
                    </span>
                  </div>
                  <div>
                    <button class="forpass" onClick={this.handleOpenModal}>Forgot Password?</button>
                  </div>
                  <div>
                    <ReactModal 
                      isOpen={this.state.showModal}
                      contentLabel="ForgotPassword Example"
                      onRequestClose={this.handleCloseModal}
                      className="Modal"
                      overlayClassName="Overlay"
                    >
                      <div>
                        <button class="modalClose" onClick={this.handleCloseModal}>X</button>
                      </div>
                      <div class="modalHeading">
                        <h1>Forgot Password</h1>
                      </div>
                      <div>
                        <div>
                          <input 
                            class="inputEmail" 
                            type="text" 
                            placeholder="Email"
                            id="EmailPass"
                            name = "textfield"
                            onChange={this.onChange}
                            value={this.state.EmailPass} 
                          />
                          <span style={{color:'red' }}>
                            {error.Email}
                          </span>
                        </div>
                        <div>
                          <h1 class="password">Password : {ResetPassword}</h1>
                        </div>
                        <div>
                          <button class="forgot" onClick={this.forpass}>Show Password</button>
                        </div>
                      </div>
                    </ReactModal>
                  </div>
                  <div >
                    <button class="buttonLogin" onClick={this.onSubmit.bind(this)}>Login</button>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}

export default Login;