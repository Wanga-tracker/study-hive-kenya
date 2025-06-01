// auth.js
const auth = firebase.auth();
const db = firebase.firestore();

// Toggle between login and signup forms
const showLoginBtn = document.getElementById('show-login');
const showSignupBtn = document.getElementById('show-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

if (showLoginBtn && showSignupBtn) {
  showLoginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    showLoginBtn.classList.add('active');
    showSignupBtn.classList.remove('active');
    errorMessage.textContent = '';
  });

  showSignupBtn.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    showLoginBtn.classList.remove('active');
    showSignupBtn.classList.add('active');
    errorMessage.textContent = '';
  });
}

// Handle Signup
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;
    const level = document.getElementById('signup-level').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Create user document in Firestore
        return db.collection('users').doc(user.uid).set({
          email: email,
          phone: phone || null,
          role: 'student', // Default role
          level: level,
          coins: 0,
          hasSeenSimulation: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        // Redirect to student dashboard
        window.location.href = 'student-dashboard.html';
      })
      .catch((error) => {
        errorMessage.textContent = error.message;
      });
  });
}

// Handle Login
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Check user role in Firestore
        return db.collection('users').doc(user.uid).get();
      })
      .then((doc) => {
        if (doc.exists) {
          const role = doc.data().role;
          if (role === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else {
            window.location.href = 'student-dashboard.html';
          }
        } else {
          errorMessage.textContent = 'No user profile found. Please sign up.';
          auth.signOut(); // Ensure user is logged out
        }
      })
      .catch((error) => {
        errorMessage.textContent = error.message;
      });
  });
}

// Handle Logout (for dashboards)
if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });
}

// Redirect if already logged in
auth.onAuthStateChanged(user => {
  if (user && window.location.pathname.endsWith('index.html')) {
    db.collection('users').doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const role = doc.data().role;
        if (role === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'student-dashboard.html';
        }
      }
    });
  }
});
