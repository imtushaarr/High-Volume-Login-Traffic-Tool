import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2iOUNCbFypXD3WQ75_iFmwaGai2axFcU",
  authDomain: "ems-test-6bc70.firebaseapp.com",
  projectId: "ems-test-6bc70",
  storageBucket: "ems-test-6bc70.firebasestorage.app",
  messagingSenderId: "171486943579",
  appId: "1:171486943579:web:b868aab17b78494a2d627e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize auth with app

export { auth }; // ✅ Export it properly