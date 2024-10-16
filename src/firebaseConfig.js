// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAP4zSfVHNCQEui7CPI6-KP5WLyC7sHpvc",
  authDomain: "crudshop-57656.firebaseapp.com",
  databaseURL: "https://crudshop-57656-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "crudshop-57656",
  storageBucket: "crudshop-57656.appspot.com",
  messagingSenderId: "548260903529",
  appId: "1:548260903529:web:1685cf763d2a1935edc0f8"
};
// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth với AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);

export { auth, database };
