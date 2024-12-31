import { auth } from '../../../Login-Register/login.js';
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js";


document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    document.addEventListener('scroll', () => {
        const navbar = document.querySelector('.container');
        if (window.scrollY > 50) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });

    
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        
        navLinks.classList.toggle('open');

        
        menuToggle.classList.toggle('active');
    });

    
    document.querySelectorAll('.navbar-list a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });




    const container = document.querySelector('.card-div-2');


    container.addEventListener('click', (event) => {

        if (event.target.closest('.card')) {
            const clickedCard = event.target.closest('.card');


            clickedCard.classList.toggle('active');
        }
    });


    document.addEventListener('click', (event) => {
        if (!event.target.closest('.card')) {
            const activeCards = document.querySelectorAll('.card.active');
            activeCards.forEach((card) => card.classList.remove('active'));
        }
    });


    document.addEventListener('scroll', () => {
        const activeCards = document.querySelectorAll('.card.active');
        activeCards.forEach((card) => card.classList.remove('active'));
    });




    const signin = document.getElementById('sign-in');
    const signup = document.getElementById('sign-up');


    signin.addEventListener('click', () => {
        window.location.href = 'Login-register/login.html';
    });

    signup.addEventListener('click', () => {
        window.location.href = 'Login-register/register.html';
    });
    auth.onAuthStateChanged((user) => {
        const userEmailElement = document.getElementById("user-email");

        if (user) {
            sessionStorage.setItem("userEmail", user.email);
            if (userEmailElement) {
                userEmailElement.style.display = "block";
                document.getElementById("sign-out").style.display = "block";
                document.getElementById("user-icon").style.display = "block";
                signin.style.visibility = "hidden";
                signup.style.visibility = "hidden";
                userEmailElement.textContent = `${user.email}`;
            }
        } else {
            sessionStorage.removeItem("userEmail");
            if (userEmailElement) {
                userEmailElement.style.display = "none";
                document.getElementById("sign-out").style.display = "none";
                document.getElementById("user-icon").style.display = "none";
                userEmailElement.textContent = "";
            }
        }
    });

    document.getElementById("sign-out").addEventListener("click", () => {
        auth.signOut();
        sessionStorage.removeItem("userEmail");
        window.location.href = "mainpage.html";
    })

    const walletModal = document.getElementById("walletModal");
    const walletStatus = document.getElementById("walletStatus");
    const walletActionButton = document.getElementById("walletActionButton");
    const walletLink = document.getElementById("walletLink");



    let connectedAddress = null;

    async function checkMetaMask() {
        if (typeof window.ethereum !== "undefined") {
            return true;
        } else {
            alert("MetaMask is not installed. Please install it to use this feature.");
            return false;
        }
    }

    async function connectWallet() {
        try {
            const isMetaMaskInstalled = await checkMetaMask();
            if (!isMetaMaskInstalled) return;


            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });


            connectedAddress = accounts[0];
            walletStatus.innerText = `Connected Wallet: ${connectedAddress}`;
            walletActionButton.style.display = "none";
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    }

    function disconnectWallet() {
        connectedAddress = null;
        walletStatus.innerText = "No wallet connected";
        walletActionButton.innerText = "Connect Now";
    }

    walletLink.addEventListener("click", (event) => {
        event.preventDefault();
        walletModal.style.display = "flex";
    });

    walletActionButton.addEventListener("click", () => {
        if (connectedAddress) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target !== walletModal && !walletModal.contains(event.target) && event.target !== walletLink) {
            walletModal.style.display = "none";
        }
    });
    window.addEventListener("scroll", () => {
        walletModal.style.display = "none";
    });



    const cards = JSON.parse(localStorage.getItem('cards')) || [];

    const cardcontainer = document.getElementById('cardContainer');


    cards.forEach((card) => {
        const listItem = document.createElement('li');
        listItem.className = 'card-item-1';

        listItem.innerHTML = `
            <div class="discover-card card" data-price="${card.productPrice}">
              <figure class="card-banner img-holder">
                <img src="${card.productImageSrc}" alt="" class="img-cover">
              </figure>
              <div class="description">
                  <p>${card.productDescription}</p> <br>
                  <p>Owner: Crypto Guard</p>
              </div>
              <div class="card-content-1">
                <div class="card-profile-1">
                  <img src="${card.authorImageSrc}" alt="">
                  <p class="label-md card-author">
                    <a href="#" class="link">@${card.authorName}</a>
                  </p>
                </div>
                <h3 class="title-md card-title card-title-1">
                  <a href="#">${card.productName}</a>
                </h3>
                <div class="price">
                  <p class="price-word">Price</p>
                  <div class="money">
                    <img src="./Metalink/assets/images/ethereum.svg" alt="" class="eth-logo">
                    <p>${card.productPrice} ETH</p>
                  </div>
                </div>
                <div class="button-container">
                  <button class="add-buy add">ADD</button>
                  <button class="add-buy buy">BUY</button>
                </div>
              </div>
            </div>
          `;

        cardcontainer.appendChild(listItem);
    });

    function checkIfUserIsSignedInWithFirebase() {
        const user = auth.currentUser;
        if (user) {
            console.log('User is signed in with Firebase:', user);
            return user;
        } else {
            console.log('No user signed in with Firebase');
            return null;
        }
    }

    async function handleDirectPayment(event) {
        if (window.ethereum) {
            try {

                const buttonElement = event.target;

                const firebaseUser = checkIfUserIsSignedInWithFirebase();
                if (!firebaseUser) {
                    alert('You need to sign in to the website first!');
                    return;
                }

                const cardElement = buttonElement.closest('.discover-card');
                const price = cardElement.dataset.price;


                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await ethereum.request({ method: 'eth_accounts' });


                const fromAddress = accounts[0];
                const valueInWei = ethers.utils.parseUnits(price, 'ether').toHexString();

                const transactionParameters = {
                    to: '0x0B3BA1BB756C1aD869aa8a72C9A8D7AAA50479B2',
                    from: fromAddress,
                    value: valueInWei,
                };


                const txHash = await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });

                console.log('Transaction successful with hash:', txHash);
                alert('Transaction successful!');
            } catch (error) {
                console.error('Transaction failed:', error);
                alert('Transaction failed. Please try again.');
            }
        } else {
            alert('MetaMask is not installed. Please install MetaMask to proceed.');
        }
    }

    const buyButtons = document.querySelectorAll('.buy');
    buyButtons.forEach((button) => {
        button.addEventListener('click', handleDirectPayment);
    });



})


