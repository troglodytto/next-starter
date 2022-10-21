import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBU1nZTIP7Dsh3KxyLQzQ5ydVIgcYtawdA',
  authDomain: 'charm-social.firebaseapp.com',
  projectId: 'charm-social',
  storageBucket: 'charm-social.appspot.com',
  messagingSenderId: '190305868067',
  appId: '1:190305868067:web:80026e542ccbaae0aed496',
  measurementId: 'G-1S0RT86PXV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const googleLogin = async () => {
  const authProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, authProvider);
  const idToken = await user.getIdToken();

  return idToken;
};

export default app;
