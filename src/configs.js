import { initializeApp } from 'firebase/app'; // Importa initializeApp desde 'firebase/app'
import { getAnalytics } from 'firebase/analytics'; // Importa getAnalytics desde 'firebase/analytics'
import { getAuth , GoogleAuthProvider} from 'firebase/auth'; 
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDkbAFPlIWlRRQdiz8zHzmonHPZ1UVDBZg",
    authDomain: "credit-card-register-444c0.firebaseapp.com",
    projectId: "credit-card-register-444c0",
    storageBucket: "credit-card-register-444c0.appspot.com",
    messagingSenderId: "79078827629",
    appId: "1:79078827629:web:1ee9837dae7b613a718164",
    measurementId: "G-SD77SVRRYE"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  const auth= getAuth(app)
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  export {auth, analytics, db, provider}