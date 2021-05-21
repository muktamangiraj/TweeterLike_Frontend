import React, { Component } from 'react';
import "../CSS/Feed.css";
import * as actions from '../Action/PostAction';
import "../CSS/Profile_Posts.css";

class  Profile_Posts extends Component {
    constructor(props) {
        super(props);
        this.state={
            UserID : this.props.location.state.detail._id,
            AllPosts : [],
            mainUser : {}
        }
    }
    
    // on Follower button click to navigate to the users follower
    onFollowerClick(){
        this.props.history.push({
            pathname: '/profilefollower',
            state: { detail: this.props.location.state.detail , NoOfPosts : this.count(this.state.AllPosts)  }
        });
    }

    // on following button click to navigate to the users following
    onFollowingClick(){
        this.props.history.push({
            pathname: '/profilefollowing',
            state: { detail: this.props.location.state.detail , NoOfPosts : this.count(this.state.AllPosts)  }
        });
    }

    // on feed button click to navigate to the users feed
    onFeedClick(){
        this.props.history.push({
            pathname: '/feed',
            state: { detail: this.props.location.state.detail }
        });
    }

    // on User button click to navigate to the users list
    onUserClick(){
        this.props.history.push({
            pathname: '/users',
            state: { detail: this.props.location.state.detail}
        });
    }

    // on delete click to delete post
    onDeleteClick = (PostID) => (e) => {
        e.preventDefault();
        const newFollow = {
            _id: PostID
        };
        actions.deletepost(newFollow);
        window.location.reload();
    }

    // count
    count = (foll) =>{
        var len = foll.length;
        return len;
    }

    componentDidMount() {
        actions.getAllPostsById(this.state.UserID).then(post => {
            this.setState({
                AllPosts : post.data
            })
        });
    }


    render() {
        const { AllPosts } = this.state;
        return (
            <div class="maindiv">
                <div class="header">
                    <h1 class="heading">TweetX</h1>
                    <div>
                        <ul class="ulstyle">
                            <li  class="list" onClick={this.onFeedClick.bind(this)}>Feed</li>
                            <li class="list" onClick={this.onUserClick.bind(this)}>Users</li>
                            <li class="list active">Profile</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="column side"></div>
                    <div class="column middle">
                        <div class="container">
                            <div class="profile">
                                <div class="profile-image">
                                    <img src="https://img.icons8.com/doodle/48/4a90e2/test-account.png" alt=""/>
                                </div>
                                <div class="profile-user-settings">
                                    <h1 class="profile-user-name">{this.props.location.state.detail.Name}</h1>
                                </div>
                                <div class="profile-stats">
                                    <ul>
                                        <li><span class="profile-stat-count">{this.count(this.state.AllPosts)}</span> posts</li>
					                    <li><span class="profile-stat-count">{this.count(this.props.location.state.detail.Follower)}</span> followers</li>
					                    <li><span class="profile-stat-count">{this.count(this.props.location.state.detail.Following)}</span> following</li>
				                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="topnav">
                            <li class="listprofile listprofileactive">Posts</li>
                            <li class="listprofile" onClick={this.onFollowerClick.bind(this)}>Follower</li>
                            <li class="listprofile" onClick={this.onFollowingClick.bind(this)}>Following</li>
                        </div>
                        <div>
                        {AllPosts.map((usr) => (
                        <div class="card">
                            <button class="deleteButton" onClick={this.onDeleteClick(usr._id)}>X</button>
                            <img src="https://img.icons8.com/doodle/50/000000/test-account.png" class="Feedimg" alt =""/>
                            <div class="container">
                               <h1 class="nameTitle">{usr.Name}</h1>
                               <p class="about">{usr.About}</p> 
                            </div>
                        </div>
                        ))};
                        </div>
                    </div>
                    <div class="column side"> </div>
                </div>
            </div>
        );
    }
}

export default Profile_Posts;