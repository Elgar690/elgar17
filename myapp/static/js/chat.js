// chat.js
const socket = io.connect('http://localhost:5000');  // Sunucu adresinizi buraya ekleyin

document.getElementById('send-button').addEventListener('click', function() {
    const message = document.getElementById('message-input').value;
    const roomId = 'room1';  // Oda ID'sini buraya ekleyin
    const timestamp = new Date().toISOString();
    const senderId = 1;  // Kullanıcı ID'sini buraya ekleyin
    const senderUsername = 'username';  // Kullanıcı adını buraya ekleyin

    socket.emit('outgoing', {
        rid: roomId,
        timestamp: timestamp,
        message: message,
        sender_id: senderId,
        sender_username: senderUsername
    });

    document.getElementById('message-input').value = '';
});

socket.on('message', function(data) {
    console.log("New message received:", data);

    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.sender_username}: ${data.message}`;
    document.getElementById('chat-box').appendChild(messageElement);

    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
});
