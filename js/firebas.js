// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

// ✅ Your Firebase project configuration (Edu Sync Hub Africa)
const firebaseConfig = {
  apiKey: "AIzaSyAcqZKghgyzk1ghfP-l8dwlHOVRNeG1TAk",
  authDomain: "edu-sync-hub-africa.firebaseapp.com",
  projectId: "edu-sync-hub-africa",
  storageBucket: "edu-sync-hub-africa.appspot.com",
  messagingSenderId: "625120725619",
  appId: "1:625120725619:web:0a373d5201cd9a87333806"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export for use in other modules
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
