import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDG_o73gqfPRo3dh563mPYdq65u1Pt4ZiE",
  authDomain: "woc6-7bd99.firebaseapp.com",
  projectId: "woc6-7bd99",
  storageBucket: "woc6-7bd99.appspot.com",
  messagingSenderId: "733562609493",
  appId: "1:733562609493:web:40defe1d7dea71671219dc",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


let Email = document.getElementById("email");
let Password = document.getElementById("password");
let login = document.getElementById("submit");

let SignInUser = (evt) => {
  evt.preventDefault();

  signInWithEmailAndPassword(auth, Email.value, Password.value)
    .then((userCredential) => {
      console.log(userCredential);
      get(child(dbref, "UsersAuthList/" + userCredential.user.uid)).then(
        (snapshot) => {
          if (snapshot.exists) {
            sessionStorage.setItem(
              "user-info",
              JSON.stringify({
                firstname: snapshot.val().firstname,
                lastname: snapshot.val().lastname,
              })
            );
            sessionStorage.setItem(
              "user-creds",
              JSON.stringify(userCredential.user)
            );
          }
        }
      );
      window.location.href = "home.html";
      alert("user loged in!");
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};

login.addEventListener("click", SignInUser);