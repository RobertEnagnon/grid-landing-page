document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments nécessaires du DOM
    const form = document.getElementById('multiStepForm'); // Formulaire
    const nextBtns = document.querySelectorAll('.next-btn'); // Boutons "Suivant"
    const prevBtns = document.querySelectorAll('.prev-btn'); // Boutons "Précédent"
    const formSteps = document.querySelectorAll('.form-step'); // Étapes du formulaire
    const steps = document.querySelectorAll('.step'); // Étapes de la timeline
    let formStepIndex = 0; // Index de l'étape actuelle

    // Événement sur les boutons "Suivant"
    nextBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Valider l'étape avant de passer à la suivante
            if (validateFormStep()) {
                formStepIndex++; // Avancer à l'étape suivante
                updateFormSteps(); // Mettre à jour l'affichage des étapes
                updateTimeline(); // Mettre à jour la timeline
            }
        });
    });

    // Événement sur les boutons "Précédent"
    prevBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            formStepIndex--; // Revenir à l'étape précédente
            updateFormSteps(); // Mettre à jour l'affichage des étapes
            updateTimeline(); // Mettre à jour la timeline
        });
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêcher la soumission par défaut
        if (validateFormStep()) {
            alert("Formulaire soumis avec succès !"); // Afficher une alerte
            form.reset(); // Réinitialiser le formulaire
            formStepIndex = 0; // Réinitialiser à la première étape
            updateFormSteps(); // Mettre à jour l'affichage
            updateTimeline(); // Mettre à jour la timeline
        }
    });

    // Fonction pour afficher l'étape actuelle du formulaire
    function updateFormSteps() {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index === formStepIndex); // Activer l'étape actuelle
        });
    }

    // Fonction pour mettre à jour la timeline
    function updateTimeline() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === formStepIndex); // Activer l'étape actuelle
            step.classList.toggle('completed', index < formStepIndex); // Marquer les étapes précédentes comme complétées
        });
    }

    // Fonction pour valider les champs de l'étape actuelle
    function validateFormStep() {
        const currentFormStep = formSteps[formStepIndex]; // Étape en cours
        const inputs = currentFormStep.querySelectorAll('input'); // Récupérer les champs de l'étape
        let isValid = true;
        
        // Vérifier si chaque champ est valide
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false; // Si un champ est invalide
                input.classList.add('invalid'); // Ajouter la classe invalid (pour styliser si besoin)
            } else {
                input.classList.remove('invalid'); // Retirer la classe si le champ est valide
            }
        });
        
        return isValid; // Retourner true si tous les champs sont valides
    }
});
