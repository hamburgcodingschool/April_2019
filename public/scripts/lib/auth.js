const provider = new firebase.auth.GoogleAuthProvider();

const login = () => {
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            app.auth.token = result.credential.accessToken;
            // The signed-in user info.
            app.auth.user = result.user;
            return result;
        })
        .catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.error(`An error happened with code ${errorCode} and eith email ${email} and message ${errorMessage}`)
        });
};

const logout = () => {
    return firebase
        .auth().signOut().then(result => {
            return result;
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
};

const getDisplayName = (uid) =>
    firebase.auth().getUser(uid)
    .then((user) => {
        console.log('Successfully fetched user data:', user.toJSON());
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
    });

app.auth = {
    login,
    logout,
    getDisplayName
};