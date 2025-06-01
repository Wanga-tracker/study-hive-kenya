const db = firebase.firestore();
const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

function sendMessage(message, recipient) {
  if (userId) {
    db.collection('chats').add({
      sender: userId,
      recipient: recipient,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

function loadChat(recipient) {
  if (userId) {
    db.collection('chats')
      .where('sender', 'in', [userId, recipient])
      .where('recipient', 'in', [userId, recipient])
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data().message);
        });
      });
  }
}
