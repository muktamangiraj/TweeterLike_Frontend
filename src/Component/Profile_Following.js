import React, { Component } from 'react'
import * as actions from '../Action/UserAction';
import '../CSS/Users.css';

export default class  Profile_Following extends Component {
    constructor(props) {
        super(props);
        this.state={
            User : [],
            mainUser : {}
        }
    }

    // on Feed button click to navigate to the users Feed
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

    // on Post button click to navigate to the users Post
    onPostsClick(){
        this.props.history.push({
            pathname: '/profileposts',
            state: { detail: this.props.location.state.detail }
        });
    }

    // on Follower button click to navigate to the users Follower
    onFollowerClick(){
        this.props.history.push({
            pathname: '/profilefollower',
            state: { detail: this.props.location.state.detail , NoOfPosts : this.props.location.state.NoOfPosts   }
        });
       
    }

    // on Profile button click to navigate to the users Profile
    onUserProfileClick(User){
        this.props.history.push({
            pathname: '/userprofile',
            state: { detail: User }
        })
    }

    // FOllow button to follow user 

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

    // Count
    count = (foll) =>{
        var len = foll.length;
        return len;
    }

    componentWillMount() {
        var len = this.props.location.state.detail.Following.length;
        for (let i = 0; i < len; i++) {
            const element = this.props.location.state.detail.Following[i];
            console.log(i);
            actions.GetUserByIDAction(element).then(user => {
                this.setState({
                    User : this.state.User.concat(user.data)
                })
            });
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
					                    <li><span class="profile-stat-count">{this.count(this.props.location.state.detail.Follower)}</span> followers</li>
					                    <li><span class="profile-stat-count">{this.count(this.props.location.state.detail.Following)}</span> following</li>
				                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="topnav">
                            <li class="listprofile" onClick={this.onPostsClick.bind(this)}>Posts</li>
                            <li class="listprofile" onClick={this.onFollowerClick.bind(this)}>Follower</li>
                            <li class="listprofile listprofileactive">Following</li>
                        </div>
                        <div>
                        {User.map((usr) => (
                            <figure class="fir-image-figure">
                                    <img class="fir-author-image fir-clickcircle" src="https://img.icons8.com/doodle/48/4a90e2/test-account.png" alt=""/>

                                <figcaption>
                                    <div class="fig-author-figure-title" onClick={this.onUserProfileClick.bind(this , usr)}>{usr.Name}</div>
                                    <div class="fig-author-figure-following">Following :{this.count(usr.Following)}</div>
                                    
                                </figcaption>
                                <div>
                                <div class="fig-author-figure-title"><button class="buttonFollowing" onClick={this.onUnFollowClick(usr._id)} >Following</button></div>
                                </div>
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
