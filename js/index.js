const database = firebase.database();
let email = null;
const msgRef = database.ref("/messages");

function sendMessage(){
    const messageInput = document.getElementById("msg-input").value;
    const msg = {
        email,
        name,
        text: messageInput
    };

    msgRef.push(msg);
}

function load(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userName = document.getElementById("user-name");
            name = user.displayName;
            email = user.email;
            msgRef.on('child_added', updateMessages);
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
    const sentMessagesContainer = document.getElementById("messages-sent");
    const receivedMessagesContainer = document.getElementById("messages-received");
    const {email: userEmail , name, text} = data.val();

    const output = text;
    let msg = '';

    if (email === userEmail) {
        msg = `<li class="message" id="sentMessage"><i class = "name">${name}: </i>${output}</li>`
        sentMessagesContainer.innerHTML += msg;
    } else {
        msg = `<li class="message" id="receivedMessage"><i class = "name">${name}: </i>${output}</li>`
        receivedMessagesContainer.innerHTML += msg;
    }
  //   document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
  //   //auto scroll to bottom
}

document.addEventListener('DOMContentLoaded', load);
