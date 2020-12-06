const msgRef = database.ref("/messages");
let email = null;
let receiverEmail = null;

function sendMessage(){
    let messageInput = document.getElementById("msg-input");
    let text = messageInput.value;
    if(!text.trim()) return alert('Please enter message.');
    const msg = {
        sender: email,
        receiver: receiverEmail,
        name,
        text
    };

    msgRef.push(msg);
    messageInput.value = "";
}

function runThrough(arr) {
    if (!arr) return false;

    const data = Object.values(arr);
    for(let i = 0; i < data.length; i++){
        if(data[i].email === email){
            return true;
        }
    }
    return false;
}


function load(){
    let chats = document.getElementById("all-conversations");

    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            const userNameContainer = document.getElementById("your-name");

            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            photo = document.getElementById("profile-image");
            photo.src = photoUrl;

            const usrRef = database.ref("/users");

            const usr = {
                email,
                name,
                photoUrl
            };
            let users = null;

            await usrRef.once('value').then((snapshot) => {
                users = snapshot.val()
            })

            if (!runThrough(users)) usrRef.push(usr);

            Object.values(users).forEach((element) => {
                if (element.email === email) return;
                addUserToChat(chats, element);
            })
            userNameContainer.innerHTML = name;

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
    const {name, receiver, sender, text} = data.val();
    if ((sender === email && receiver === receiverEmail) || (sender === receiverEmail && receiver === email)) {
        const msg = `<li class="message" id="${email === sender ? "messages-sent": "messages-received"}">
    <i class = "name">${name}</i><br><i>${text}</i>
    </li>`;
        messagesContainer.innerHTML += msg;
        document.getElementById("conversation").scrollTop = document.getElementById("conversation").scrollHeight;
    }
}

function addUserToChat(chatsHTML, user) {
    const divConvCont = document.createElement("div");
    divConvCont.className = "conversation-container";

    const divConvItem = document.createElement("div");
    divConvItem.className = "conversation-item";

    const divConvLogo = document.createElement("div");
    divConvLogo.className = "conversation-logo";

    const divConvText = document.createElement("div");
    divConvText.className = "conversation-text";

    const profileImg = document.createElement("img");
    profileImg.className = "profile-image";
    profileImg.src = user.photoUrl;

    const divYourName = document.createElement("div");
    divConvText.className = "your-name";

    const divConvLast = document.createElement("div");
    divConvLast.className = "conversation-last";

    const openChatButton = document.createElement("button");
    openChatButton.className = "button";
    openChatButton.innerHTML = "Message";
    openChatButton.onclick = function () {
        const messagesContainer = document.getElementById("messages");
        messagesContainer.innerHTML = "";
        receiverEmail = user.email;
        msgRef.on('child_added', updateMessages);
    }
    const textNickname = document.createTextNode(user.name);

    divConvLast.appendChild(openChatButton);

    divYourName.appendChild(textNickname);
    divConvText.appendChild(divYourName);
    divConvText.appendChild(divConvLast);
    divConvLogo.appendChild(profileImg);

    divConvItem.appendChild(divConvLogo);
    divConvItem.appendChild(divConvText);

    divConvCont.appendChild(divConvItem);

    const li = document.createElement("li");
    li.appendChild(divConvCont);
    chatsHTML.appendChild(li);
}

document.addEventListener('DOMContentLoaded', load);
