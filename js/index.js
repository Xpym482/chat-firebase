const database = firebase.database();
const msgRef = database.ref("/messages");
let email = null;

function sendMessage(){
    let messageInput = document.getElementById("msg-input");
    let text = messageInput.value;
    if(!text.trim()) return alert('Please enter message.');
    const msg = {
        email,
        name,
        text
    };

    msgRef.push(msg);
    messageInput.value = "";
}

function load(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userNameContainer = document.getElementById("your-name");
            const userName = document.getElementById("user-name");
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            photo = document.getElementById("profile-image");
            photo.src=photoUrl;
            msgRef.on('child_added', updateMessages);
            userNameContainer.innerHTML = name;
            //userName.innerHTML = "Welcome, " + name + "!";

        } else {
            window.location.replace("login.html");
        }
    });
}

function googleSignout() {
    firebase.auth().signOut()
        .then(function() {
            window.location.replace("login.html");
        }, function(error) {
            console.log(error);
        });
}

function updateMessages(data) {
    const messagesContainer = document.getElementById("messages");
    const {email: userEmail , name, text} = data.val();
    const msg = `<li class="message" id="${email === userEmail ? "messages-sent": "messages-received"}">
    <i class = "name">${name}</i><br><i>${text}</i>
    </li>`;
    if(email != userEmail){
        console.log(userEmail);
    }

    messagesContainer.innerHTML += msg;
    document.getElementById("conversation").scrollTop = document.getElementById("conversation").scrollHeight;
}

document.addEventListener('DOMContentLoaded', load);
