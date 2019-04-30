export const LogIn = (credentials) => {
    return (dispach, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispach({ type: "LOGIN_SUCCESS" })
        }).catch(() => {
            dispach({ type: "LOGIN_ERROR"})
        })
    }
}