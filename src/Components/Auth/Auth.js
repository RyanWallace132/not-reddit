import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../../ducks/reducer'
import axios from 'axios'
import './auth.css'





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
                alert('This User Already Exists ')
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
                alert('Username or Password Is Incorrect')
            })
    }
    

    render(){
        document.title="Internet Forum Login"
        return (
            <div>
                <div className="authContainer">
                    <div className='logoContainer'>
                     <img className='logo' src='https://i.imgur.com/UzRCIoK.png'/>
                    </div>
                    <h1 className="internet-forum">Internet Forum</h1>
                    <div className='inputContainer'>
                    <h2 className="username">Username:</h2>
                    <input className="usernamebox" placeholder="" name="username" onChange={(e) => {this.handleInput(e)}} />
                    </div>
                    <div className='inputContainer'>
                    <h2 className="password">Password:</h2>
                    <input type="password" className="passwordbox" placeholder="" name="password" onChange={(e) => {this.handleInput(e)}} />
                    </div>
                    <div className='buttonContainer'>
                    <button className="loginButton" onClick={() => this.handleLogin()} > Login </button>
                    <button className="registerButton" onClick={() => this.handleRegister()} > Register </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, {loginUser})(Auth)