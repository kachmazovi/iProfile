import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAUhhesnxGwRPC3DA5B6umhzfXsrlMwxkw',
  authDomain: 'springsoft-1.firebaseapp.com',
  projectId: 'springsoft-1',
  storageBucket: 'springsoft-1.appspot.com',
  messagingSenderId: '2110782459',
  appId: '1:2110782459:web:d71b80923defd483a7a95e',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
