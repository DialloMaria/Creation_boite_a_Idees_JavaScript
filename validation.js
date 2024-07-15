// document.addEventListener('DOMContentLoaded', function() {
//     validation(); // Appel de la fonction de validation après le chargement du document
// });
// function validation() {
//     const form = document.getElementById('ideaForm');

//     // Tableau pour stocker les idées
//     let ideas = [];

//     form.addEventListener('submit', function(event) {
//         event.preventDefault();

//         // Récupération des champs du formulaire
//         const libelle = document.getElementById("libelle").value.trim();
//         const categorie = document.getElementById("categorie").value;
//         const description = document.getElementById("description").value.trim();

//         let isValid = true;
        

//         // Réinitialisation des messages d'erreur
//         document.getElementById('error-libelle').textContent = '';
//         document.getElementById('error-categorie').textContent = '';
//         document.getElementById('error-description').textContent = '';

//         // Validation des champs libelle
//         if (libelle === '') {
//             isValid = false;
//             document.getElementById('error-libelle').textContent = 'Veuillez saisir votre libellé.';
//         } else if (libelle.length < 10) {
//             isValid = false;
//             document.getElementById('error-libelle').textContent = 'Votre libellé doit contenir au moins 10 caractères.';
//         } else if (libelle.length > 50) {
//             isValid = false;
//             document.getElementById('error-libelle').textContent = 'Votre libellé ne doit pas dépasser 50 caractères.';
//         }

//         // Validation des champs catégorie
//         if (categorie === '') {
//             isValid = false;
//             document.getElementById('error-categorie').textContent = 'Veuillez sélectionner une catégorie.';
//         }

//         // Validation des champs description
//         if (description === '') {
//             isValid = false;
//             document.getElementById('error-description').textContent = 'Veuillez saisir votre description.';
//         } else if (description.length < 100) {
//             isValid = false;
//             document.getElementById('error-description').textContent = 'Votre description doit contenir au moins 100 caractères.';
//         } else if (description.length > 255) {
//             isValid = false;
//             document.getElementById('error-description').textContent = 'Votre description ne doit pas dépasser 255 caractères.';
//         }

//         // Si le formulaire est valide, soumettre le formulaire
//         if (isValid) {
//             document.getElementById('success-message').style.display = 'block'; // Affichage du message de succès
//             form.reset(); // Réinitialisation du formulaire
//         }
//         // Affichage du message d'erreur si la validation échoue
//         if (!isValid) {
//             errorMessage.textContent = 'Veuillez corriger les erreurs ci-dessus.';
//             errorMessage.style.display = 'block';
//             setTimeout(() => {
//                 errorMessage.style.display = 'none';
//             }, 2000); // Masque le message d'erreur après 2 secondes
//             return;
//         }
//         // Ajout de la nouvelle idée au tableau
//         const newIdea = { libelle, categorie, description, approved: false }; // Création d'un objet idée
//         ideas.push(newIdea); // Ajout de l'idée au tableau
//         // localStorage.setItem("ideas",JSON.stringify(ideas));
//         rendercards(); // Mise à jour de l'affichage du tableau

//         // Affichage du message de succès
//         successMessage.style.display = 'block';
//         setTimeout(() => {
//             successMessage.style.display = 'none';
//         }, 2000); // Masque le message de succès après 2 secondes

//         // Réinitialisation du formulaire
//         form.reset(); // Réinitialise les champs du formulaire
//     });
        
// }











document.addEventListener('DOMContentLoaded', function() {
    validation(); // Appel de la fonction de validation après le chargement du document
});

function validation() {
    const form = document.getElementById('ideaForm');

    // Tableau pour stocker les idées
    let ideas = JSON.parse(localStorage.getItem('ideas')) || [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Récupération des champs du formulaire
        const libelle = document.getElementById("libelle").value.trim();
        const categorie = document.getElementById("categorie").value;
        const description = document.getElementById("description").value.trim();
        // const counter = document.getElementById('char-counter');
        // const maxLenght = description.getAttribute('maxlength');

        let isValid = true;

        // Réinitialisation des messages d'erreur
        document.getElementById('error-libelle').textContent = '';
        document.getElementById('error-categorie').textContent = '';
        document.getElementById('error-description').textContent = '';

        const regexNoDigitsOrSpecialChars = /^[a-zA-Z\s]+$/; 
        const regexNoHTML = /<\/?[^>]+(>|$)/g; 

        // Validation des champs libelle
        if (libelle === '') {
            isValid = false;
            document.getElementById('error-libelle').textContent = 'Veuillez saisir votre libellé.';
        }
         else if (!regexNoDigitsOrSpecialChars.test(libelle)) {
            isValid = false;
            document.getElementById('error-libelle').textContent = 'Le libellé ne doit pas contenir de chiffres ou de caractères spéciaux.';
        } else if (regexNoHTML.test(libelle)) {
            isValid = false;
            document.getElementById('error-libelle').textContent = 'Le libellé ne doit pas contenir de balises HTML.';
        } else if (libelle.length < 10) {
            isValid = false;
            document.getElementById('error-libelle').textContent = 'Votre libellé doit contenir au moins 10 caractères.';
        } else if (libelle.length > 50) {
            isValid = false;
            document.getElementById('error-libelle').textContent = 'Votre libellé ne doit pas dépasser 50 caractères.';
        }

        // Validation des champs catégorie
        if (categorie === '') {
            isValid = false;
            document.getElementById('error-categorie').textContent = 'Veuillez sélectionner une catégorie.';
        }

        // Validation des champs description
        if (description === '') {
            isValid = false;
            document.getElementById('error-description').textContent = 'Veuillez saisir votre description.';
        } 
        else if (!regexNoDigitsOrSpecialChars.test(description)) {
            isValid = false;
            document.getElementById('error-description').textContent = 'La description ne doit pas contenir de chiffres ou de caractères spéciaux.';
        } else if (regexNoHTML.test(description)) {
            isValid = false;
            document.getElementById('error-description').textContent = 'La description ne doit pas contenir de balises HTML.';
        }else if (description.length < 100) {
            isValid = false;
            document.getElementById('error-description').textContent = 'Votre description doit contenir au moins 100 caractères.';
        } else if (description.length > 255) {
            isValid = false;
            document.getElementById('error-description').textContent = 'Votre description ne doit pas dépasser 255 caractères.';
        }

        // Si le formulaire est valide, ajouter l'idée
        if (isValid) {
            // Ajout de la nouvelle idée au tableau
            const newIdea = { libelle, categorie, description, approved: false }; // Création d'un objet idée
            ideas.push(newIdea); // Ajout de l'idée au tableau
            localStorage.setItem('ideas', JSON.stringify(ideas)); // Mettre à jour le localStorage
            renderCards(); // Mise à jour de l'affichage des cartes

            // Affichage du message de succès
            document.getElementById('success-message').style.display = 'block'; // Affichage du message de succès
            form.reset(); // Réinitialisation du formulaire
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 2000); // Masque le message de succès après 2 secondes
        } else {
            // Affichage du message d'erreur si la validation échoue
            document.getElementById('error-message').textContent = 'Veuillez corriger les erreurs ci-dessus.';
            document.getElementById('error-message').style.display = 'block';
            setTimeout(() => {
                document.getElementById('error-message').style.display = 'none';
            }, 2000); // Masque le message d'erreur après 2 secondes
        }
    });

    function renderCards() {
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = ''; // Réinitialiser le contenu du conteneur des cartes

        ideas.forEach((idea, index) => {
            const card = document.createElement('div');
            card.className = `card ${idea.approved ? 'border-success' : 'border-danger'}`;
            card.innerHTML = `

            <style> 
            .danger{
            color:red;
            }
            .success{
            color:green;
            }
            </style>
                <div class="card-body">
                    <span class="delete-icon" data-index="${index}">&times;</span>
                    <h5 class="card-title">${idea.libelle}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${idea.categorie}</h6>
                    <p class="card-text">${idea.description}</p>
                </div>
                <div class="card-actions">
                    <i   class="fas approve-icon ${idea.approved ? 'danger' : 'success'}" onclick="toggleApproval(${index})">${idea.approved ? '<i class="fas fa-thumbs-down"></i>' : '<i class="fas fa-thumbs-up"></i>'}</i>
                    <i class="fas fa-trash delete-icon" onclick="deleteIdea(${index})"></i>
                </div>
              
            `;
            cardsContainer.appendChild(card);
        });

        // Ajout des écouteurs d'événement pour les icônes de suppression
        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                ideas.splice(index, 1); // Supprimer l'idée du tableau
                localStorage.setItem('ideas', JSON.stringify(ideas)); // Mettre à jour le localStorage
                renderCards(); // Mettre à jour l'affichage des cartes
            });
        });
    }

    // Initialiser l'affichage des cartes avec les idées stockées
    renderCards();

    // Fonction pour approuver/désapprouver une idée
    window.toggleApproval = function(index) {
        ideas[index].approved = !ideas[index].approved; // Inverse le statut d'approbation de l'idée
        localStorage.setItem('ideas', JSON.stringify(ideas)); // Mettre à jour le localStorage
        renderCards(); // Met à jour l'affichage des cartes
    };

    // Fonction pour supprimer une idée
    window.deleteIdea = function(index) {
        ideas.splice(index, 1); // Supprime l'idée du tableau à l'index spécifié
        localStorage.setItem('ideas', JSON.stringify(ideas)); // Mettre à jour le localStorage
        renderCards(); // Met à jour l'affichage des cartes
    };
    // Écouteur d'événement pour mettre à jour le compteur de caractères
    description.addEventListener('input', e => {
        const maxLength = 255;
        const currentLength = e.target.value.length;

        const leftCharLength = maxLength - currentLength;

        if (leftCharLength < 0) return;

        // Mise à jour du texte du compteur avec la valeur actuelle et le total
        document.getElementById('char-counter').innerText = `${currentLength}/${maxLength}`;
    });

}


