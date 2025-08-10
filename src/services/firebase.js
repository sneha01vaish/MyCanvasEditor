import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPgXNERKPxpf5HzYas1qvfUF29mBfHd-o",
  authDomain: "canvaseditor-8162e.firebaseapp.com",
  projectId: "canvaseditor-8162e",
  storageBucket: "canvaseditor-8162e.firebasestorage.app",
  messagingSenderId: "676598600175",
  appId: "1:676598600175:web:b2d201a947777cb24be61a",
  measurementId: "G-X1087D4CM0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;