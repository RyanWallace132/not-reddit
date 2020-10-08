import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './nav.css'

class Nav extends Component {
    render(){
        return(
            <nav className='nav'>
                {/* <img src = {this.props.user.profile_picture} alt='profile picture' /> */}
                {this.props.email}
                <Link to="/dashboard"> <button className='home' >Home</button> </Link>
                {/* <Link to="/new"> <button className='new-post' >New Post</button> </Link> */}
                <Link to="/"> <button className='logout' >Logout</button> </Link>
            </nav>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Nav)