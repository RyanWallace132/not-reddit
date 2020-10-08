import React, {Component} from 'react'
import Form from '../Form/Form'
import {connect} from 'react-redux'
import './post.css'
class Post extends Component{
    constructor(){
        super()
        this.state = {
            posts:[],
            title: '',
            img: '',
            content: '',
            author: '',

            isEditing: false
        }
    }

    toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }


    render(){
        return this.state.isEditing ? (
            <Form 
             handleEdit = {this.props.handleEdit}
             handleDelete = {this.props.handleDelete}
             post = {this.props.post}
             toggleEdit = {this.toggleEdit}
             />
        ) : (

            <div className='content-row'>
                <h3 className='post-title'>{this.props.post.title}</h3>
                <div>
                    <p className='post-content'>{this.props.post.content}</p>
                    <p src={this.props.img}>  </p>
                </div>
                <div className='edit-delete-button'>
                <button className='edit-button' onClick={() => {this.toggleEdit()}}>Edit Post</button>
                <button className='delete-button' onClick={() => {this.props.handleDelete(this.props.post.id)}}>Delete Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => (reduxState)

export default connect(mapStateToProps)(Post)