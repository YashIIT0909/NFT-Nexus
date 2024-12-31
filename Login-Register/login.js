// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import firebaseConfig from '../api.js';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




document.addEventListener('DOMContentLoaded', () => {

    const submit = document.getElementById('submit');
    submit.addEventListener('click', (e) => {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                window.location.href = '../mainpage.html';
               
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                
            });
    })
    const reset = document.getElementById('reset');

    reset.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent!');
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                alert('Please Sign-Up first');

                // ..
            });
    })

    const password = document.getElementById('password');
    const lock = document.getElementById('lock');

    lock.onclick = () => {
        if (password.type == 'password') {
            password.type = 'text';
            lock.src = 'IMGs/lock-open.png';
        } else {
            password.type = 'password';
            lock.src = 'IMGs/lock.png';
        }
    }

})



export { auth };

