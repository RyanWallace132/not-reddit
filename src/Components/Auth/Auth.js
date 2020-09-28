import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../../ducks/reducer'
import axios from 'axios'



class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState ({
            [e.target.name]: e.target.value,
        })
    }

    handleRegister = () => {
        const {username, password} = this.state
        axios
            .post('/api/auth/register', {username, password})
            .then((res) => {
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    handleLogin = (e) => {
        const {username, password} = this.state
        axios
            .post('/api/auth/login', {username, password})
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    render(){
        return (
            <div className="auth-container">
                <div>
                    <h1 className="auth-not-reddit">Not Reddit</h1>
                    <h2 className="username">Username:</h2>
                    <h2 className="password">Password:</h2>
                    <input className="username-box" placeholder="Enter Username" name="username" onChange={(e) => {this.handleInput(e)}} />
                    <input className="password-box" placeholder="Enter Password" name="password" onChange={(e) => {this.handleInput(e)}} />
                    <button className="login-Button" onClick={() => this.handleLogin()} > Login </button>
                    <button className="register-button" onClick={() => this.handleRegister()} > Register </button>
                </div>
            </div>
        )
    }
}


export default connect(null, {loginUser})(Auth)