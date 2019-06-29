export const LogIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .then(() => {
        dispatch({ type: "RETRIEVE_STATUS" });
      })
      .catch(() => {
        dispatch({ type: "LOGIN_ERROR" });
      });
  };
};

export const LogOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGOUT_ERROR", err });
      });
  };
};

export const SignUpNewUser = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            password: newUser.password,
            tasks: []
          });
      })

      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
