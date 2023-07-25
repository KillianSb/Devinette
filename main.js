/*
 * Copyright Killian.Sb (c) 2023.
 */

creer_lettres_alphabet();
reset();

function essaier() {
    let nb_essaie = document.getElementById("nb_essaie");
    let nombre = parseInt(nb_essaie.innerText);
    nombre = nombre - 1;
    nb_essaie.innerText = nombre;
    if (nombre == 0) {
        alert("Vous avez perdu!");
        location.reload();
    }
}

function reset() {
    // Je recupere le bouton
    let btn = document.getElementById("recommencer");
    btn.addEventListener(
        "click",
        () => {
            location.reload();
        });
} // Réinitialiser le jeu

function creer_lettres_alphabet() {
    // Créer un tableau contenant les lettres de l'alphabet
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // Afficher le tableau dans la console

    const divLettres = document.getElementById('lettres');
    for (let i = 0; i < alphabet.length; i++) {
        /*console.log(alphabet[i]);*/

        // Créer un nouvel élément <p>
        const pElement = document.createElement('p');
        // Ajouter la lettre en tant que texte du nouvel élément <p>
        pElement.textContent = alphabet[i];

        pElement.classList.add('lettre');
        pElement.id = [i];

        // Ajouter le nouvel élément <p> en tant qu'enfant de la balise <div> ayant l'ID "lettres"
        divLettres.appendChild(pElement);
    }
    creer_mot_a_rechercher(alphabet);
} // Créer le tableau de lettres de l'alphabet

function creer_mot_a_rechercher(alphabet) {

    const mots = ['BONJOUR', 'ORDINATEUR', 'CHIEN', 'CHAT', 'MAISON', 'JARDIN', 'AVION', 'VOITURE','VELO'];

    // Générer un nombre aléatoire entre 0 et la longueur du tableau (moins un) pour sélectionner un index
    const indexAleatoire = Math.floor(Math.random() * mots.length);

    // Récupérer le mot aléatoire en utilisant l'index généré
    const motAleatoire = mots[indexAleatoire];

    // Afficher le mot aléatoire dans la console
    console.log('Mot aléatoire choisi : ' + motAleatoire);

    let tab_motAChercher = [];
    let tab_motAfficher = [];

    for (let i = 0; i < motAleatoire.length; i++) {
        tab_motAChercher.push(motAleatoire[i])
        /*console.log(tab_motAChercher);*/
    }/*console.log(tab_motAChercher);*/

    let afficher_tab_motAfficher = document.getElementById('container_mot');
    for (let i = 0; i < motAleatoire.length; i++) {
        tab_motAfficher.push("_")
        /*console.log(tab_motAfficher);*/

        const pMots = document.createElement('p');

        // Ajouter la lettre en tant que texte du nouvel élément <p>
        pMots.textContent = "_";

        pMots.classList.add('lettreMot');
        pMots.id = [i];

        // Ajouter le nouvel élément <p> en tant qu'enfant de la balise <div> ayant l'ID "lettres"
        afficher_tab_motAfficher.appendChild(pMots);

    }
    /*console.log(tab_motAfficher);*/
    rechercher_une_lettre(tab_motAChercher,tab_motAfficher,alphabet);
} // Creation du mot à rechercher en remplacant ses lettres par des "_"

function rechercher_une_lettre(tab_motAChercher,tab_motAfficher,alphabet) {

    // Sélectionner tous les éléments <p> créés
    const elementsP = document.querySelectorAll('#lettres p');

    elementsP.forEach((pElement) => {
        pElement.addEventListener('click', function() {
            const valeurElement = this.textContent;

            const idElement = this.id;

            const motAChercher = tab_motAChercher.join('');

            // Trouver tous les indices des occurrences de la lettre cliquée dans le mot à chercher
            const indices = [];
            let startIndex = 0;

            while (startIndex < motAChercher.length) {
                const index = motAChercher.indexOf(valeurElement, startIndex);
                if (index !== -1) {
                    indices.push(index);
                    startIndex = index + 1;
                } else {
                    break;
                }
            }

            if (indices.length > 0) {
                // Remplacer toutes les occurrences de la lettre dans le tableau tab_motAfficher
                indices.forEach(index => tab_motAfficher[index] = valeurElement);

                console.log('Lettre trouvée !');

                // Afficher le mot mis à jour dans l'élément ayant l'ID "container_mot"
                const afficher_tab_motAfficher = document.getElementById('container_mot');
                afficher_tab_motAfficher.innerText = tab_motAfficher.join(' ');

                setTimeout(verif_victoire, 300, tab_motAChercher, tab_motAfficher);
            } else {
                console.log('Lettre non trouvée !');
                essaier();
            }
            // Supprimer l'élément <p> cliqué de la balise <div> ayant l'ID "lettres"
            document.getElementById('lettres').removeChild(pElement);
        });
    });
}


function verif_victoire(tab_motAChercher,tab_motAfficher) {
/*    console.log(tab_motAChercher);
    console.log(tab_motAfficher);*/

    let verif1 = true;
    let verif2 = true;

    // Vérifier d'abord si les tableaux ont la même longueur
    if (tab_motAChercher.length !== tab_motAfficher.length) {
        return false;
    }

    // Parcourir les éléments des deux tableaux et comparer leurs valeurs
    for (let i = 0; i < tab_motAChercher.length; i++) {
        if (tab_motAChercher[i] !== tab_motAfficher[i]) {
            return false;
        }
    }

    // Vérifier si les deux tableaux sont identiques
    if (verif1 === verif2) {
        let nb_essaie = document.getElementById("nb_essaie");
        let nombre = parseInt(nb_essaie.innerText);

        let nb_lettre = tab_motAChercher.length;

        if (nombre === 5) {
            alert("Vous avez gagné avec le meilleur score ! \n" +
                (nb_lettre * nombre) + " points !\n" +
                "Bravo !");
            location.reload();
        }else {
            alert("Vous avez gagné avec " + (nb_lettre * nombre) + " points !\n" +
                "Le meilleur score est de " + (5 * nombre) + " !");
            location.reload();
        }
    }
} // Vérifier si le jeu est gagné