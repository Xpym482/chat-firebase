function googleSignin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            firebase.auth()
                .signInWithPopup(provider).then( async function(result) {
                window.location.replace("index.html");
            }).catch(function(error) {
                console.log(error)
            });
        });
}
