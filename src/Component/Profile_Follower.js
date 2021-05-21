import React, { Component } from 'react'
import * as actions from '../Action/UserAction';
import '../CSS/Users.css';

export default class Profile_Follower extends Component {
    constructor(props) {
        super(props);
        this.state={
            User : [],
            AllUsers : [],
            UserID : "",
            mainUser :this.props.location.state.detail,
            
        }
    }
    
    // on Feed button click to navigate to the users posts list
    onFeedClick(){
        this.props.history.push({
            pathname: '/feed',
              
            state: { detail: this.props.location.state.detail }
        })
    }

    // on User button click to navigate to the users list
    onUserClick(){
        this.props.history.push({
            pathname: '/users',
            state: { detail: this.props.location.state.detail }
        });
    }

    // on User button click to navigate to the users list
    onFollowingClick(){
        this.props.history.push({
            pathname: '/profilefollowing',
            state: { detail: this.state.mainUser , NoOfPosts :this.props.location.state.NoOfPosts  }
        });
    }

    // on Post button click to navigate to the users Posts
    onPostsClick(){
        this.props.history.push({
            pathname: '/profileposts',
            state: { detail: this.props.location.state.detail }
        });
    }

    // count
    count = (foll) =>{
        var len = foll.length;
        return len;
    }

    // on User Profile click to navigate to the users Profile
    onUserProfileClick(User){
        this.props.history.push({
            pathname: '/userprofile',
            state: { detail: User }
        })
    }

    // on follow button click to follow other users
    onFollowClick = (User_ID) => (e) =>{
        e.preventDefault();
        const newFollow = {
            _id: this.props.location.state.detail._id,
            UserID: User_ID
        };
        actions.OnFollowClickAction(newFollow);
        actions.OnFollower(newFollow);
        window.location.reload();
    }

    // on unfollow click to unfollow othar users
    onUnFollowClick = (User_ID) => (e) =>{
       e.preventDefault();
        const newFollow = {
            _id: this.props.location.state.detail._id,
            UserID: User_ID
        };
        actions.OnUnFollowClickAction(newFollow);
        actions.OnUnFollower(newFollow);
        window.location.reload();
    }

    componentWillMount() {
        console.log("state");
        console.log(this.state);
        var len = this.props.location.state.detail.Follower.length;
        for (let i = 0; i < len; i++) {
            const element = this.props.location.state.detail.Follower[i];
            console.log(i);
            actions.GetUserByIDAction(element).then(user => {
                this.setState({
                    User : this.state.User.concat(user.data)
                })
            });
            console.log(this.state);
        }
       actions.GetUserByIDAction(this.props.location.state.detail._id).then(user => {
            this.setState({
                mainUser : user.data
            })
        }); 
    }

    componentDidMount() {
        actions.GetUserByIDAction(this.props.location.state.detail._id).then(user => {
            this.setState({
                mainUser : user.data
            })
        });
    }
    
    render() {
        const { User } = this.state;
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
                                        <li><span class="profile-stat-count">{this.props.location.state.NoOfPosts}</span> posts</li>
					                    <li><span class="profile-stat-count">{this.count(this.state.mainUser.Follower)}</span> followers</li>
					                    <li><span class="profile-stat-count">{this.count(this.state.mainUser.Following)}</span> following</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="topnav">
                            <li class="listprofile" onClick={this.onPostsClick.bind(this)}>Posts</li>
                            <li class="listprofile listprofileactive">Follower</li>
                            <li class="listprofile" onClick={this.onFollowingClick.bind(this)}>Following</li>
                        </div>
                        <div>
                        {User.map((usr) => (
                            <figure class="fir-image-figure">
                                    <img class="fir-author-image fir-clickcircle" src="https://img.icons8.com/doodle/48/4a90e2/test-account.png" alt=""/>

                                <figcaption>
                                    <div class="fig-author-figure-title" onClick={this.onUserProfileClick.bind(this , usr)}>{usr.Name}</div>
                                    <div class="fig-author-figure-following">Following :{this.count(usr.Following)}</div>
                                    
                                </figcaption>
                                {this.state.mainUser.Follower.indexOf(usr._id) === -1
                                    ?
                                    <button class="buttonFollowing" onClick={this.onUnFollowClick(usr._id)} >Following</button>:
                                    <button class="buttonFollow" onClick={this.onFollowClick(usr._id )} >Follow</button>
                                }
                            </figure>
                                    
                        ))};
                    </div>
                </div>
                <div class="column side"> </div>
                </div>
            </div>
        )
    }
}
