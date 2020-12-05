
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD_haTEYcJPhtGFdPxpqrsJLqw06zwIo2I",
    authDomain: "chatjs-827cc.firebaseapp.com",
    databaseURL: "https://chatjs-827cc-default-rtdb.firebaseio.com",
    projectId: "chatjs-827cc",
    storageBucket: "chatjs-827cc.appspot.com",
    messagingSenderId: "875691551341",
    appId: "1:875691551341:web:61113513c9f71804a66d64"
    };
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


function sendMessage(){
    const messageInput = document.getElementById("msg-input").value; 
    const messagegBtn = document.getElementById("msg-btn").value; 
    const sentMessage = document.getElementById("sentMessage");
    const receivedMessage = document.getElementById("receivedMessage");
    const msgRef = database.ref("/messages"); 
    msgRef.push(messageInput);
    sentMessage.innerHTML = messageInput; 
};
