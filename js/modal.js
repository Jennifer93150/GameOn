//ici j'ai modifier var x en navBar + compréhensible
function editNav() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");
const bgMsg = document.querySelector('.bground-msg');
const closeMsg = document.querySelector('.close-msg');
const btnMsg = document.querySelector('#btn-submit-msg');

// ECOUTEUR MODAL (au clic sur "je m'inscris" la modal s'ouvre)
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// AFFICHAGE DE LA MODAL
function launchModal() {
  modalbg.style.display = "block";
}

// FERMETURE DE LA MODAL
close.addEventListener("click", closeModal);
function closeModal() {
  modalbg.style.display = "none";
}

// FERMETURE DU MSG SUCCES
closeMsg.addEventListener("click", closeModalMsg);
btnMsg.addEventListener("click", closeModalMsg);
btnMsg.addEventListener("click", closeModal);
function closeModalMsg() {

  bgMsg.style.display = "none";

  form.reset();
}
