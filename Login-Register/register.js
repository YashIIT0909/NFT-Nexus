// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import firebaseConfig from '../api.js';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



// const confirmPassword = document.getElementById('confirmpassword').value;
const errorMessage = document.getElementById('errorMessage');
const submit = document.getElementById('submit');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', (event) => {
        
        event.preventDefault();
        const pass = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;
        if (pass != confirmPassword) {
            errorMessage.style.display = 'block';
            errorMessage.style.textAlign = 'center';
            errorMessage.innerHTML = 'Passwords do not match!';
        }
        else {
            submit.addEventListener('click', (e) => {
                e.preventDefault();
                errorMessage.style.display = 'none';
                const password = document.getElementById('password').value;
                const email = document.getElementById('email').value;
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        window.location.href = 'login.html';
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(errorMessage);
                        // ..
                    });
            })
        }


    })

    const password = document.getElementById('password');
    const lock = document.getElementById('lock');
    const confirmpassword = document.getElementById('confirmpassword');
    const lock2 = document.getElementById('lock2');

    lock.onclick = () => {
        if (password.type === 'password') {
            password.type = 'text';
            lock.src = 'IMGs/lock-open.png';
        } else {
            password.type = 'password';
            lock.src = 'IMGs/lock.png';
        }
    }
    lock2.onclick = () => {
        if (confirmpassword.type == 'password') {
            confirmpassword.type = 'text';
            lock2.src = 'IMGs/lock-open.png';
        } else {
            confirmpassword.type = 'password';
            lock2.src = 'IMGs/lock.png';
        }
    }
})

