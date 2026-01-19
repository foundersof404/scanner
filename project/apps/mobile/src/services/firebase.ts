import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcl9qdmbNxQV2ctWkkyGcNRIDNWjOVLwM",
  authDomain: "savr-dc54d.firebaseapp.com",
  projectId: "savr-dc54d",
  storageBucket: "savr-dc54d.firebasestorage.app",
  messagingSenderId: "857176919336",
  appId: "1:857176919336:web:6154cd6ca734fabef1141d",
  measurementId: "G-Z1RJ0BD4TB"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

