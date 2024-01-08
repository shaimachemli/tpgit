  // Variable pour suivre le total
  var totalAchat = 0;

  document.addEventListener('DOMContentLoaded', function () {
      initialiserTotalAchat();
      afficherProduitsDuPanier();
  });
  
  function initialiserTotalAchat() {
      // Initialiser la somme totale en parcourant toutes les lignes existantes
      var lignesProduit = document.querySelectorAll('.produit-ligne');
      for (var i = 0; i < lignesProduit.length; i++) {
          mettreAJourTotalAchat(lignesProduit[i]);
      }
  }
  
  function afficherProduitsDuPanier() {
      // Récupérez le panier du stockage local
      var panier = JSON.parse(localStorage.getItem('panier')) || [];
  
      // Accédez à l'élément tbody du tableau
      var tbody = document.querySelector('table tbody');
  
      // Videz le contenu actuel du tbody
      tbody.innerHTML = '';
  
      // Affichez chaque produit du panier
      panier.forEach(function (produitAjoute) {
          ajouterProduitAuPanier(produitAjoute);
      });
  
      // Mettez à jour la somme totale
      mettreAJourTotalAchat();
  }
  
  
  function ajouterProduitAuPanier(produitAjoute) {
     
      // Ajouter le prix à la somme totale
      totalAchat += parseFloat(produitAjoute.prix.replace(' TND', ''));
  
      // Affichez les informations du produit dans le tableau
      var table = document.querySelector('table tbody');
      var newRow = table.insertRow(table.rows.length);
      newRow.classList.add('produit-ligne'); // Ajoutez une classe à la ligne pour l'identifier
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);
        // Ajouter le bouton de suppression
        var cell6 = newRow.insertCell(5);
          cell6.innerHTML = '<button onclick="supprimerProduit(this)" style="background-color: #ff3fa5; color: black; padding: 0.5rem;">Supprimer</button>';
  
      cell1.innerHTML = '<img src="' + produitAjoute.imageSrc + '" alt="Produit">';
      cell2.innerHTML = '<p>' + produitAjoute.titre + '</p>';
      cell3.innerHTML = '<p class="prix">' + produitAjoute.prix + '</p>';
      cell4.innerHTML = '<input type="number" value="1" min="1" onchange="mettreAJourQuantite(this)">';
      cell5.innerHTML = '<p class="sous-total">' + produitAjoute.prix + '</p>';
  
      // Ajouter les attributs de données pour la quantité et le total
      newRow.setAttribute('data-quantite', 1);
      newRow.setAttribute('data-total', parseFloat(produitAjoute.prix.replace(' TND', '')));
  
      // Mettez à jour la somme totale
      mettreAJourTotalAchat();
  }
  
  function mettreAJourQuantite(input) {
      var quantite = input.value;
      var ligneProduit = input.closest('.produit-ligne');
  
      // Mettez à jour les attributs de données pour la quantité et le total de cette ligne
      ligneProduit.setAttribute('data-quantite', quantite);
      mettreAJourTotalAchat(ligneProduit);
  }
  
  function mettreAJourTotalAchat(ligneProduit) {
    
      // Ajoutez une vérification pour s'assurer que ligneProduit n'est pas undefined
      if (ligneProduit) {
          var prixUnitaire = parseFloat(ligneProduit.querySelector('.prix').innerText.replace(' TND', ''));
          var quantite = parseFloat(ligneProduit.getAttribute('data-quantite')) || 0;
  
          // Mettez à jour les attributs de données pour le total de cette ligne
          var totalLigne = prixUnitaire * quantite;
          ligneProduit.setAttribute('data-total', totalLigne.toFixed(3));
  
          // Mettez à jour le sous-total de cette ligne
          ligneProduit.querySelector('.sous-total').innerText = totalLigne.toFixed(3) + ' TND';
      }
  
      // Mettez à jour la somme totale
      totalAchat = 0;
      var lignesProduit = document.querySelectorAll('.produit-ligne');
      for (var i = 0; i < lignesProduit.length; i++) {
          var totalLigne = parseFloat(lignesProduit[i].getAttribute('data-total')) || 0;
          totalAchat += totalLigne;
      }
  
      // Mettez à jour l'affichage du total
      var totalElement = document.getElementById('totalAchat');
      if (totalElement) {
          totalElement.innerText = totalAchat.toFixed(3) + ' TND';
      }
  }
  
  function supprimerProduit(button) {
    var ligneProduit = button.parentElement.parentElement;
    var prixUnitaire = parseFloat(ligneProduit.querySelector('.prix').innerText.replace(' TND', ''));
    var quantite = parseFloat(ligneProduit.getAttribute('data-quantite')) || 0;

    // Mettez à jour les attributs de données pour le total de cette ligne
    var totalLigne = prixUnitaire * quantite;

    // Mettez à jour le sous-total de cette ligne
    ligneProduit.querySelector('.sous-total').innerText = '0.000 TND';

    // Mettez à jour la somme totale
    totalAchat = 0;
    var lignesProduit = document.querySelectorAll('.produit-ligne');
    for (var i = 0; i < lignesProduit.length; i++) {
        var totalLigne = parseFloat(lignesProduit[i].getAttribute('data-total')) || 0;
        totalAchat += totalLigne;
    }

    // Mettez à jour l'affichage du total
    var totalElement = document.getElementById('totalAchat');
    if (totalElement) {
        totalElement.innerText = totalAchat.toFixed(3) + ' TND';
    }

    // Supprimez la ligne du DOM
    ligneProduit.remove();

    // Mettez à jour le panier dans le stockage local
    mettreAJourPanier();
    mettreAJourTotalAchat();
}
          function mettreAJourPanier() {
              var lignesProduit = document.querySelectorAll('.produit-ligne');
              var panier = [];
  
              // Parcourez chaque ligne et ajoutez le produit au panier
              for (var i = 0; i < lignesProduit.length; i++) {
                  var titre = lignesProduit[i].querySelector('p').innerText;
                  var prix = lignesProduit[i].querySelector('.prix').innerText;
                  var imageSrc = lignesProduit[i].querySelector('img').src;
                  var quantite = parseInt(lignesProduit[i].getAttribute('data-quantite'));
  
                  var produit = {
                      titre: titre,
                      prix: prix,
                      imageSrc: imageSrc,
                      quantite: quantite
                  };
  
                  panier.push(produit);
              }
  
              // Stockez le panier mis à jour dans le stockage local
              localStorage.setItem('panier', JSON.stringify(panier));
          }

          document.addEventListener('DOMContentLoaded', function() {
            // Vérifier si la page actuelle est la page "Récap panier"
            if (document.title === 'Mon Panier') {
                // Afficher une alerte pour le débogage
                alert("Je suis dans la page voir panier");
        
                // Récupérer le prénom et le nom à l'aide de la boîte de dialogue prompt
                var prenom = prompt('Entrez votre prénom :');
                var nom = prompt('Entrez votre nom :');
        
                // Ajouter du contenu HTML au-dessus du tableau
                var cartElement = document.querySelector('.cart');
                cartElement.style.marginBottom = '10px'; // Ajustez la valeur selon vos besoins
                cartElement.insertAdjacentHTML('beforebegin', '<p style="font-size: 30px;text-align: center; font-weight: bold; color:#ff3fa5; margin-top:120px; margin-bottom:0px">Voici le panier de Mr/Mme ' + prenom + ' ' + nom + '</p><br>');
            }
        });
        