export const LogIn = (credentials) => {
    return (dispach, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispach({ type: "LOGIN_SUCCESS" })
        }).catch(() => {
            dispach({ type: "LOGIN_ERROR" })
        })
    }
}

export const LogOut = () => {
    return (dispach, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
            .then(() => {
                dispach({ type: "LOGOUT_SUCCESS" })
            }).catch((err) => {
                dispach({ type: "LOGOUT_ERROR", err })
            })
    }
}

export const SignUpNewUser = (newUser) => {
    return (dispach, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            firestore.collection('users').doc(response.user.uid).set({
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: newUser.password,
                tasks: []
            })
        })

            .then(() => {
                dispach({ type: "SIGNUP_SUCCESS" })
            }).catch((err) => {
                dispach({ type: "SIGNUP_ERROR", err })
            })
    }
}

