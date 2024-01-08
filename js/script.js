document.write('<p style="font-size: 30px;text-align: center; font-weight: bold; color:#ff3fa5; margin-top:20px; margin-bottom:0px">Merci de nous avoir choisi</p><br>');

window.onscroll = () =>{
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
 
}

function ajouterAuPanierEtRediriger(button) {
  // Obtenez les informations du produit
  var produit = button.parentElement.parentElement;
  var titre = produit.querySelector('.cardtitle').innerText;
  var prix = produit.querySelector('.cardpx b').innerText;
  var imageSrc = produit.querySelector('.cardimg img').src;

  // Créez un objet représentant le produit
  var produitAjoute = {
      titre: titre,
      prix: prix,
      imageSrc: imageSrc
  };

  // Récupérez le panier du stockage local
  var panier = JSON.parse(localStorage.getItem('panier')) || [];

  // Vérifiez si le produit (titre et image) est déjà dans le panier
  var produitExiste = panier.some(function (item) {
      return item.titre === produitAjoute.titre && item.imageSrc === produitAjoute.imageSrc;
  });

  // Ajoutez le produit uniquement s'il n'est pas déjà dans le panier
  if (!produitExiste) {
      panier.push(produitAjoute);
      // Stockez le panier mis à jour dans le stockage local
      localStorage.setItem('panier', JSON.stringify(panier));
  }
}
  function redirigerVersVoirPanier() {
      // Redirigez l'utilisateur vers la page voirpanier.html
      window.location.href = 'voirpanier.html';}
//js im
function mon_compte(){
window.open("mon_compte.html","width=200","height=200","top=200","left=200");
}
function afficherMessage() {
  var nom = document.getElementById('nom').value;
  alert("Merci, " + nom + ", de nous avoir contactés!");
}

//carousel

$(document).ready(function(){
  $('.carousel').slick({
      // Options de configuration du carrousel
      infinite: true,
      slidesToShow: 3, // Nombre de produits affichés à la fois
      slidesToScroll: 1,
      autoplay: true, // Activer le défilement automatique
     
  });
});
////
$(document).ready(function(){
$('.carousel-container').slick({
    // Options de configuration du carrousel
    infinite: true,
    slidesToShow: 1, // Nombre de produits affichés à la fois
    slidesToScroll: 1,
    autoplay: true, // Activer le défilement automatique
    autoplaySpeed: 2000 // Vitesse du défilement automatique en millisecondes
});
});
$(document).ready(function(){
  $('.carousel-container1').slick({
      // Options de configuration du carrousel
      infinite: true,
      slidesToShow: 5, // Nombre de produits affichés à la fois
      slidesToScroll: 1,
      autoplay: true, // Activer le défilement automatique
      autoplaySpeed: 2000 // Vitesse du défilement automatique en millisecondes
  });
  });

    $(document).ready(function(){
        $('.brand-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: false
                },
                1000: {
                    items: 5,
                    nav: true,
                    loop: false
                }
            }
        });
    });


