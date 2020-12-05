const database = firebase.database();
const msgRef = database.ref("/messages");
let email = null;

function sendMessage(){
    let messageInput = document.getElementById("msg-input");
    const msg = {
        email,
        name,
        text: messageInput.value
    };

    msgRef.push(msg);
    messageInput.value = "";
}

function load(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userName = document.getElementById("user-name");
            name = user.displayName;
            email = user.email;
            msgRef.on('child_added', updateMessages);
            console.log(user);
            userName.innerHTML = "Welcome, " + name + "!";
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
    <i class = "name">${name}: </i>${text}
    </li>`;

    messagesContainer.innerHTML += msg;
    document.getElementById("conversation").scrollTop = document.getElementById("conversation").scrollHeight;
}

document.addEventListener('DOMContentLoaded', load);
