// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfPQS8bss3O1aeU9yHPsFxyngrFnJkz54",
    authDomain: "taskmanager-b3c80.firebaseapp.com",
    projectId: "taskmanager-b3c80",
    storageBucket: "taskmanager-b3c80.appspot.com",
    messagingSenderId: "519736682059",
    appId: "1:519736682059:web:c70e2389a32d555d450fce",
    measurementId: "G-0FW9P89930"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, storage };
