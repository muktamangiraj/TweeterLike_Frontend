import React, { Component } from 'react';
import "../CSS/Feed.css";
import "../CSS/Users.css";
import * as actions from '../Action/UserAction';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state ={
            AllUsers : [],
            UserID : "",
            mainUser :this.props.location.state.detail,
        }
    }
    
    // on Feed button click to navigate to the users feed
    onFeedClick(){
        this.props.history.push({
            pathname: '/feed',
            state: { detail: this.props.location.state.detail }
        })
    }

    // on profile button click to navigate to the users profile
    onProfileClick(){
        this.props.history.push({
            pathname: '/profileposts',
            state: { detail: this.state.mainUser }
        })

    }

    // on profile button click to navigate to the users profile
    onUserProfileClick(User){
        this.props.history.push({
            pathname: '/userprofile',
            state: { detail: User }
        })
    }

    // unfollow
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

    // count
    count = (foll) =>{
        var len = foll.length;
        return len;
    }
    
    // follow
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

    componentWillMount() {
        actions.getAllUser().then(user => {
            this.setState({
                AllUsers : user
            })
        });
        actions.GetUserByIDAction(this.props.location.state.detail._id).then(user => {
            this.setState({
                mainUser : user.data
            })
        });
    }

    

    render() {
        const { AllUsers } = this.state;
        return (
            <div class="maindiv">
                <div class="header">
                    <h1 class="heading">TweetX</h1>
                    <div>
                        <ul class="ulstyle">
                            <li  class="list" onClick={this.onFeedClick.bind(this)}>Feed</li>
                            <li class="list  active">Users</li>
                            <li class="list" onClick={this.onProfileClick.bind(this)}>Profile</li>
                        </ul>
                    </div>
                </div>
                <div class="rowUser">
                    <div class="columnUser sideUser">
                </div>
                    <div class="columnUser middleUser">
                        {AllUsers.map((usr) => (
                            <figure class="fir-image-figure">
                                <img class="fir-author-image fir-clickcircle" src="https://img.icons8.com/doodle/48/4a90e2/test-account.png" alt=""/>
                                <figcaption>
                                    <div class="fig-author-figure-title" onClick={this.onUserProfileClick.bind(this , usr)}>{usr.Name}</div>
                                    <div class="fig-author-figure-following">Following :{this.count(usr.Following)}</div>
                                </figcaption>
                                <div>
                                    <div class="fig-author-figure-title">
                                        { this.state.mainUser.Following.indexOf(usr._id) !== -1
                                            ?
                                            <button class="buttonFollowing" onClick={this.onUnFollowClick(usr._id)} >Following</button>:
                                            usr._id === this.props.location.state.detail._id ? 
                                            <button class="buttonFollow" disabled="true" onClick={this.onFollowClick(usr._id )} >My Self</button> :
                                            <button class="buttonFollow" onClick={this.onFollowClick(usr._id )} >Follow</button>
                                        }
                                    </div>
                                </div>
                            </figure>
                        ))};
                    </div>
                    <div class="columnUser sideUser">
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;

