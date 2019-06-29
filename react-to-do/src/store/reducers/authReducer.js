import { stat } from "fs";

const initState = {
    authError: null,
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log("login error");
            return {
                ...state,
                authError: 'Wrong email or password'
            }
        case 'LOGIN_SUCCESS':
            console.log("login success")
            return {
                ...state,
                authError: null,
            }
        case 'LOGOUT_ERROR':
            console.log("logout failed")
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGOUT_SUCCESS':
            console.log("logout successfully");
            return state

        case 'SIGNUP_ERROR':
            console.log("signup failed")
            return {
                ...state,
                authError: action.err.message
            }
        case 'SIGNUP_SUCCESS':
            console.log("Signup successfully");
            return {
                ...state,
                authError: null
            }
        case 'WRONG_RETYPE':
            return{
                ...state,
                authError: "passwords don't match"
            }
        default:
            return state

    }
}

export default authReducer
