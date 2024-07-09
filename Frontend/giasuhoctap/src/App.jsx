import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import ToastWrapper from "./routes/ToastWrapper"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRQ2QwOAv78F_REQUEwr0kKFiCux2wFaw",
  authDomain: "gia-su-hoc-tap.firebaseapp.com",
  projectId: "gia-su-hoc-tap",
  storageBucket: "gia-su-hoc-tap.appspot.com",
  messagingSenderId: "785113240134",
  appId: "1:785113240134:web:54fb23a4043a7e8726b047",
  measurementId: "G-WSLXMVWLLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastWrapper />
    </>
  )
}
export default App;

