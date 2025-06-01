const db = firebase.firestore();
const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

function storeFileBase64(file, callback) {
  if (userId && file.size <= 500000) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      db.collection('files').add({
        userId: userId,
        file: base64,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(callback).catch(err => console.error('Error storing file:', err));
    };
    reader.readAsDataURL(file);
  } else {
    console.error('File too large or user not authenticated');
  }
}
