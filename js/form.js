// VERIFICATION DES CHAMPS DU FORMULAIRE
const form = document.querySelector('form');

//Ecoute la validation du form et vérifie les conditions de remplissage
form.addEventListener('submit', verifyForm);

// Regex pour le prenom et le nom
function checkName(name) {
  var re = /^[a-z,A-Z]+$/i;
  return re.test(name);
}

// Regex pour l'email
function checkEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Fonction verif si date de naiss 
function checkBirthdate(birthdate){
    var birthdate = document.getElementById('birthdate');
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth()+1;//J'ai mis +1 car il au mois de dec il m'affiche nov
    var currentDay = date.getDate();
    //Si année selectionnée est > à année en cours
    // Ou année select = année en cours et mois select > au mois en cours
    // Ou année select = année en cours et mois select = mois en cours et jour select > jour en cours
    if(birthdate.value.substr(0, 4) > currentYear-18 
    || birthdate.value.substr(0, 4) == currentYear-18 && birthdate.value.substr(5, 2) > currentMonth
    || birthdate.value.substr(0, 4) == currentYear-18 && birthdate.value.substr(5, 2) == currentMonth && birthdate.value.substr(8, 2) > currentDay){
      return false
    }else{
      return true
    }
}

// Fonction verif choix d'une ville 
function checkEmptyRadio(){
  // var location = document.getElementsByClassName('location');
  // var msgErrorCity = document.querySelector('div#error-msg-city');
  // // je crée un tableau qui contiendra ts les noms d'input
  // var locationArray = new Array();
  // for (i=0; i<location.length; i++) {
  //   // à chq itération un elt est ajouté au tableau(ex:location1,...)
  //   locationArray[i] = 'location'+(i+1);// +1 car itération commence à 0 et je veux location1 pas location0
  // }

  // Je selectionne mes elts
  var location = document.getElementsByClassName('location');
  var location1 = document.getElementById('location1');
  var location2 = document.getElementById('location2');
  var location3 = document.getElementById('location3');
  var location4 = document.getElementById('location4');
  var location5 = document.getElementById('location5');
  var location6 = document.getElementById('location6');
  var msgErrorCity = document.querySelector('div#error-msg-city');
  // Si une case est cochée 
  if(location1.checked || location2.checked || location3.checked || location4.checked || location5.checked || location6.checked){
    return true;
  }else{// sinon affiche msg erreur
    msgErrorCity.classList.add('error-msg');
    msgErrorCity.style.display="block";
    msgErrorCity.innerText ='Veuillez selectionner une ville';
  }
    // Je boucle sur les inputs pour écouter si un d'entre eux est coché entre tps
  for(i=0; i<location.length; i++){
    location[i].addEventListener("input", function(){
      // Si oui je retire le msg d'erreur
      msgErrorCity.style.display = "none";
    })
  }
}  

// Fonction affichage msg erreur et border rouge
function showError(elt, msgElt, content){
    elt.classList.add('is-invalid');
    msgElt.classList.add('error-msg');
    msgElt.style.display = "block";
    msgElt.innerText = content;
    // A la saisie ds le champs suppression du msg erreur et border
    elt.addEventListener('input', function(){
      msgElt.style.display = "none";
      elt.classList.remove('is-invalid');
    })
}

// Fonction de verification de chq champs
function verifyForm(e) {
  // Je selectionne mes éléments
  var first = document.getElementById('first');
  var firstValue = first.value;
  var msgErrorFirst = document.getElementById('error-msg-first');

  var last = document.getElementById('last');
  var lastValue = last.value;
  var msgErrorLast = document.getElementById('error-msg-last');

  var email = document.getElementById('email');
  var emailValue = email.value;
  var msgErrorEmail = document.getElementById('error-msg-email');

  var birthdate = document.getElementById('birthdate');
  var birthdateValue = birthdate.value;
  var msgErrorBirth = document.getElementById('error-msg-birth');

  var quantity = document.getElementById('quantity');
  var quantityValue = quantity.value;
  var msgErrorQuantity = document.getElementById('error-msg-quantity');

  var checkbox1 = document.getElementById('checkbox1');  
  var msgErrorCondition = document.getElementById('error-msg-condition');
  
  var msgError = document.getElementById('error-message-validate');
  var nbErrors = 0;
 
  // verif si prenom > à 2 caract et si que des lettres
  if(firstValue == "" || firstValue.length < 2 || checkName(firstValue)== false) {
    nbErrors++;
    showError(first, msgErrorFirst, 'Saisissez au min 2 caractères. Uniquement des lettres');
  }
  // verif si nom > à 2 caract et si que des lettres
  if(lastValue == "" || lastValue.length < 2|| checkName(lastValue)== false) {
    nbErrors++;
    showError(last, msgErrorLast, 'Saisissez au min 2 caractères. Uniquement des lettres');
  }
  // verif si email valide grace a regex 
  if(checkEmail(emailValue)== false) {
    nbErrors++;
    showError(email, msgErrorEmail, 'Saisissez une adresse email correcte.');
  }
  // verif si date de naissance est > à 18 ans
  if(birthdateValue == "" || checkBirthdate(birthdateValue)==false) {
    nbErrors++;
    showError(birthdate, msgErrorBirth, 'Vous devez avoir 18 ans pour participer');
  }
  // verif si choix du nbr de tournois
  if(quantityValue == "") {
    nbErrors++;
    showError(quantity, msgErrorQuantity, 'Selectionnez un nombre de tournois.');
  }
  // verif choix d'une ville 
  checkEmptyRadio();
  // verif si conditions utilisation est cochée
  if(!checkbox1.checked) {
    nbErrors++;
    showError(checkbox1, msgErrorCondition, 'Selectionnez les conditions générales.');
  }
  // Message d'erreur Si au - 1 erreur ou de succès SI aucune erreur
  if(nbErrors > 0) {
    e.preventDefault()
    msgError.classList.add('error-msg');
    msgError.style.display = "block";
    msgError.innerText='Veillez à bien remplir le formulaire';
    msgError.style.fontSize="25px";
  }else{// Sinon affichage du msg de succès
    msgError.style.display = "none";
		document.querySelector('.bground-msg').style.display = "block";
		e.preventDefault();
	}
}

