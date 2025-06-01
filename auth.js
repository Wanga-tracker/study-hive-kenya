const auth = firebase.auth();
const db = firebase.firestore();

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              const role = doc.data().role;
              if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
              } else {
                window.location.href = 'student-dashboard.html';
              }
            } else {
              document.getElementById('error-message').textContent = 'User data not found.';
            }
          });
      })
      .catch((error) => {
        document.getElementById('error-message').textContent = error.message;
      });
  });
}

if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });
}
