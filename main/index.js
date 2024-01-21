import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
      import {getDatabase,ref,set,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
      import {getAuth,createUserWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

      let Email = document.getElementById("email");
      let Password = document.getElementById("password");
      let submit = document.getElementById("submit");

      let RegisterUser = (evt) => {
        evt.preventDefault();

        createUserWithEmailAndPassword(auth, Email.value, Password.value)
          .then((userCredential) => {
            console.log(userCredential);
            set(ref(db, "UsersAuthList/" + userCredential.user.uid), {
              email: Email.value,
            });
            alert("user created");
          })
          .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
          });
      };

      submit.addEventListener("click", RegisterUser);