

                    // Imported the app.js and database.js
                    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
                    import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

                    const firebaseConfig = {
                        apiKey: "AIzaSyBMgG4sGTh2lHdL0lWWn2yfzftJaAFkNeA",
                        authDomain: "actor2-a4356.firebaseapp.com",
                        projectId: "actor2-a4356",
                        storageBucket: "actor2-a4356.appspot.com",
                        messagingSenderId: "347882648039",
                        appId: "1:347882648039:web:5ecf67b3bcf80945d78d42"
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
