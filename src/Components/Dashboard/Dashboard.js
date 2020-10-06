import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Dashboard.css'
import Post from '../Post/Post'

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts:[],
            title: '',
            search: '',
            userInput: '',
            myPost: true,
        }
        this.reset = this.reset.bind(this)
    }
    componentDidMount(){
        this.getPosts()
    }

    getPosts = () => {
        let {search, myPosts} = this.state
        let url = "/api/posts"

        if (myPosts && !search) {
            url += "?user_posts=true&search="
        } else if (!myPosts && search) {
            url += `?user_posts=false&search=${search}`
        } else if (myPosts && search) {
            url += `?user_posts=true&search=${search}`
        } else if (!myPosts && !search) {
            url += "?user_posts=false&search="
        }
        axios.get(url).then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = () => {
        console.log('hit')
        const {userInput: content, title} = this.state
        axios.post(`/api/posts/${this.props.user.id}`, {content, title}).then(
            (res) => {
                this.setState ({
                    posts: res.data,
                    userInput:''
                })
            }
        )
    }

    handleEdit = (id, content) => {
        axios.put(`/api/posts/${id}`, {content}).then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }

    handleDelete = (id) => {
        axios.delete(`/api/posts/${id}`).then((res) => {
            this.setState({
                posts:res.data
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    reset(){
        let url = "/api/posts"
        if(this.state.myPost){
            url+="?user_posts=true&search="
        }
        axios.get(url).then(res => {
            this.setState({posts: res.data, search:""})
        })
    }

    render(){
        console.log(this.state.posts)
        const mapPosts = this.state.posts.map(e => {
            return(
                <Post
                post={e}
                key={e.id}
                handleClick={this.handleClick}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                />
            )
        })
        return(
            <div>
                <div>
                {/* <input checked= {this.state.myPost} onChange={() => this.setState({myPosts: !this.state.myPosts}, this.getPosts)} type='checkbox'/> */}
                </div>
                <div className='create'>
                    <input className='title' type='text' placeholder= 'Title' name='title' onChange={(e) => {this.handleInput(e)}} />
                    <input className='subject' type='text' placeholder = 'Subject' name='userInput' onChange={ (e) => {this.handleInput(e)}} />
                    <button className='create-button' onClick={() => {
                        this.handleClick()
                    }}>Create Post</button>
                </div>
                <div>
                    <section className='post-box'>{mapPosts}</section>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Dashboard)