// Imported the app.js and database.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBoBwWHN6GiTjiiV7qN5bj-3mSdzPimkwQ",
    authDomain: "ceochoose-7a8c5.firebaseapp.com",
    projectId: "ceochoose-7a8c5",
    storageBucket: "ceochoose-7a8c5.appspot.com",
    messagingSenderId: "982946060201",
    appId: "1:982946060201:web:9bb15e3afdb455ca6096b8"
};

// First Initialize Firebase
const app = initializeApp(firebaseConfig);

// then get ref to database services
const db = getDatabase(app);
const userRef = ref(db, 'user');

// then listen for changes and update the table
onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    updateTable(userData);
});

document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault();
    set(ref(db, 'user/' + document.getElementById("username").value), {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        Actor: document.getElementById("phone").value
    });
    alert("Data Saved");
});

// This is the function to update the table
function updateTable(userData) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; 

    for (const key in userData) {
        if (Object.hasOwnProperty.call(userData, key)) {
            const user = userData[key];
            const row = `<tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.Actor}</td>
                </tr>`;
            tableBody.innerHTML += row;
        }
    }
}