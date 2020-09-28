import axios from 'axios'

const initialState = {
    user: [{
        username: 'Ryan',
        profile_picture: 'https://robohash.org/24.218.243.24.png',
        id: 0
    }],
    isLoggedIn: false, 
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'


export function loginUser(username, id, profile_pic) {
    return {
        type: LOGIN_USER,
        payload: {
            username: username,
            id: id,
            profile_picture: profile_pic
        }
    }
}

export function logoutUser(user) {
    return{
        type: LOGOUT_USER,
        payload: null
    }
}

export function getUser(user) {
    const payload = axios.get('/auth/user')

    return{
        type: GET_USER,
        payload:payload
    }
}



export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload.username, id: action.payload.id, profile_picture: action.payload.profile_picture}
            case LOGOUT_USER:
                return initialState
                case GET_USER +  '_PENDING':
                    return{...state, user: action.payload.username, id: action.payload.id, profile_picture: action.payload.profile_picture} 
                    case GET_USER+'FULFILLED':
                        return{...state, user: action.payload.username, id: action.payload.id, profile_picture: action.payload.profile_picture }
                        case GET_USER+'_REJECTED':
                            return initialState
                                default:
                                    return state
    }
}