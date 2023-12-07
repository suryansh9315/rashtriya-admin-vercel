import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyArWo2tbFkzdGwDkMc3kafOAc2MI7B6n_k",
  authDomain: "news-website-399809.firebaseapp.com",
  projectId: "news-website-399809",
  storageBucket: "news-website-399809.appspot.com",
  messagingSenderId: "1017015853476",
  appId: "1:1017015853476:web:af6b601a56e4117739a131"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { app, storage }

