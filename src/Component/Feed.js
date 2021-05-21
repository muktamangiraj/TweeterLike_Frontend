import React, { Component } from 'react';
import "../CSS/Feed.css";
import ReactModal from 'react-modal';
import * as actions from '../Action/PostAction';
import AddPostValidation from '../validations/AddPostValidation';

class  Feed extends Component {
    constructor(props) {
        super(props);
        this.state={
            showModal: false,
            Name : this.props.location.state.detail.Name,
            About : "",
            AllPosts : [],
            UserID : this.props.location.state.detail._id,
            errors :{},
            detail :{},
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    // on input text change
    onChange = e => {
        console.log("xxxxxxxxxxx");
        this.setState({ [e.target.id]: e.target.value});
    };

    // Modal
    handleOpenModal () {
        this.setState({ showModal: true });
    }
  
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    // on User button click to navigate to the users list
    onUserClick(){
        this.props.history.push({
            pathname: '/users',
            state: { detail: this.props.location.state.detail }
        })
    }

    // // on Profile button click to navigate to the Profile of user
    onProfileClick(){
        this.props.history.push({
            pathname: '/profileposts',
            state: { detail: this.props.location.state.detail }
        });
    }

    // on write button click to write the post
    onPostClick= (e) =>{
        e.preventDefault();
        const newPost = {
            UserID: this.state.UserID,
            Name: this.state.Name,
            About: this.state.About
        };
        var PostData = AddPostValidation({
            UserID: this.state.UserID,
            Name: this.state.Name,
            About: this.state.About
        });
        if(PostData.isValid) {
            actions.addpost(newPost);
            alert("Added sucessfully")
            this.handleCloseModal();
            window.location.reload();
        } else {
            this.setState({ errors: PostData.errors });
        }
    }

    
    componentDidMount() {
        actions.getAllPosts().then(post => {
            this.setState({
                AllPosts : post
            })
        });
    }
    

    render() {
        const { AllPosts } = this.state;
        const { errors } = this.state;
        return (
            <div class="maindiv">
                <div class="header">
                    <h1 class="heading">TweetX</h1>
                    <div>
                        <ul class="ulstyle">
                            <li  class="list active">Feed</li>
                            <li class="list" onClick={this.onUserClick.bind(this)}>Users</li>
                            <li class="list" onClick={this.onProfileClick.bind(this)}>Profile</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="column side">
                    </div>
                    <div class="column middle">
                        <div>
                            <button class="buttonwrite" onClick={this.handleOpenModal}>Write</button>
                            <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="onRequestClose Example"
                                onRequestClose={this.handleCloseModal}
                                className="Modal"
                                overlayClassName="Overlay"
                            >
                                <div >
                                    <button class="modalClose" onClick={this.handleCloseModal}>X</button>
                                </div>
                                <div class="modalHeading">
                                    <h1>Write Post</h1>
                                </div>
                                
                                <div>
                                    <div>
                                        <textarea 
                                            class="inputAbout" 
                                            placeholder="Write Post"
                                            id="About"
                                            name = "textfield"
                                            onChange={this.onChange}
                                            value={this.state.About} 
                                        />
                                        <span style={{color:'red' }}>
                                            {errors.About}
                                        </span>
                                    </div>

                                    <div>
                                        <button class="addPost" onClick={this.onPostClick}>Add Post</button>
                                    </div>
                                </div>
                            </ReactModal>
                        </div>
                        {AllPosts.map((usr) => (
                            <div class="card">
                                <img src="https://img.icons8.com/doodle/50/000000/test-account.png" class="Feedimg" alt=""/>
                                <div class="container">
                                    <h1 class="nameTitle">{usr.Name}</h1>
                                    <p class="about">{usr.About}</p> 
                                </div>
                            
                            </div>
                        ))};
                    </div>
                    <div class="column side">
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;