import React, { Component } from 'react';
import "../CSS/Feed.css";
import * as actions from '../Action/PostAction';
import "../CSS/Profile_Posts.css";

export default class User_Profile extends Component {

    constructor(props) {
        super(props);
        this.state={
            AllPosts : []
        }
    }
    
    count = (foll) =>{
        var len = foll.length;
        return len;
    }

    componentDidMount() {
        actions.getAllPostsById(this.props.location.state.detail._id).then(post => {
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
                        <div>
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
                    </div>
                    <div class="column side"> </div>
                </div>
            </div>
        )
    }
}
