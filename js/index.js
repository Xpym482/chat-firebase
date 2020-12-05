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

async function runThrough(massiiv){
    console.log(massiiv.length)
    
    for(let i = 0; i < massiiv.length; i++){
        console.log(massiiv[i])
        if(massiiv[i].email == email){
            return true;
        }
    }
    return false;
}


function load(){
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            const userNameContainer = document.getElementById("your-name");
            
            const userName = document.getElementById("user-name");

            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            photo = document.getElementById("profile-image");
            photo.src=photoUrl;

            const usrRef = database.ref("/users");

            const usr = {
                email,
                name,
                photoUrl
            };
            let users = [];
            await usrRef.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    users.push(childSnapshot.val());
                });
            });
            if (!runThrough(users)){usrRef.push(usr);}
            msgRef.on('child_added', updateMessages);
            //console.log(users);
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
    const {email: userEmail , name, text} = data.val();
    const msg = `<li class="message" id="${email === userEmail ? "messages-sent": "messages-received"}">
    <i class = "name">${name}</i><br><i>${text}</i>
    </li>`;
    messagesContainer.innerHTML += msg;
    document.getElementById("conversation").scrollTop = document.getElementById("conversation").scrollHeight;
}

document.addEventListener('DOMContentLoaded', load);
