const db = firebase.firestore();
const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

function addCoins(amount) {
  if (userId) {
    db.collection('users').doc(userId).update({
      coins: firebase.firestore.FieldValue.increment(amount)
    });
  }
}

function spendCoins(amount, feature) {
  if (userId) {
    db.collection('users').doc(userId).get().then(doc => {
      const currentCoins = doc.data().coins || 0;
      if (currentCoins >= amount) {
        db.collection('users').doc(userId).update({
          coins: currentCoins - amount
        });
        console.log(`Unlocked ${feature}`);
      } else {
        alert('Not enough coins!');
      }
    });
  }
}
