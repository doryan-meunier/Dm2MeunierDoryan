import { renewTag, delay, injectElements } from "./functions/dom.js";

const wrapper = document.querySelector('#controle');

let started = false; // Variable pour suivre l'état de démarrage
let moneyInMachine = 0; // Déclarer la variable à un niveau supérieur
// Variables globales pour stocker les quantités d'ingrédients
let waterSupply = 400; // ml
let milkSupply = 540; // ml
let coffeeBeansSupply = 120; // g
let cupsSupply = 9; // Nombre de tasses jetables

// Variable globale pour stocker l'argent du client
let customerMoney = 550; // Montant actuel dans la machine à café


const etapes = [
    "Commence à faire le café",
    "Mouds les grains de café",
    "Fait chauffer l'eau",
    "Infuse les grains de café moulus",
    "Verse le café dans une tasse",
    "Ajoute un peu de lait dans la tasse",
    "Le café est terminé."
];

const laListe = renewTag('ul');

function start() {
    wrapper.append(laListe);
    injectElements(etapes, laListe);
}


    const delays = [2000, 3000, 1500, 2500, 2000, 1000, 2000]; // Délais en millisecondes pour chaque étape

    const inputField = document.createElement('input'); // Champ de saisie
    inputField.type = 'text';
    inputField.placeholder = 'Entrez le nombre de tasses...';
    wrapper.append(inputField, laListe);
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Acheter';
    wrapper.append(buyButton);

    const fillButton = document.createElement('button');
    fillButton.textContent = 'Remplir';
    wrapper.append(fillButton);

    const takeButton = document.createElement('button');
    takeButton.textContent = 'Prendre';
    wrapper.append(takeButton);

    // Ajout de la zone pour afficher les résultats
    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'ingredientQuantities';
    wrapper.append(resultDisplay);

    async function displaySteps() {
        await injectElements(etapes, laListe, delays);
    }

    buyButton.addEventListener('click', () => {
        const numberOfCups = parseInt(inputField.value, 10); // Convertit la valeur en nombre entier
        if (!isNaN(numberOfCups)) {
            // Demander le type de café
            const coffeeType = prompt('Choisissez le type de café : expresso, latte, cappuccino');
            if (coffeeType) {
                buyCoffee(numberOfCups, coffeeType.toLowerCase()); // Convertir en minuscules pour gérer les entrées en majuscules/minuscules
                displaySuppliesQuantities();
            } else {
                alert('Veuillez choisir un type de café.');
            }
        } else {
            alert('Veuillez entrer un nombre valide de tasses.');
        }
    });

    fillButton.addEventListener('click', () => {
        fillSupplies();
        displaySuppliesQuantities();
    });

    takeButton.addEventListener('click', () => {
        takeMoney();
        displaySuppliesQuantities();
    });
    function buyCoffee(numberOfCups, coffeeType) {
        let waterNeeded, milkNeeded, coffeeBeansNeeded, costPerCup;
    
        // Sélectionner les quantités en fonction du type de café
        switch (coffeeType) {
            case 'expresso':
                waterNeeded = 250; // ml
                milkNeeded = 0; // ml
                coffeeBeansNeeded = 16; // g
                costPerCup = 4; // Unité monétaire par tasse
                break;
            case 'latte':
                waterNeeded = 350; // ml
                milkNeeded = 75; // ml
                coffeeBeansNeeded = 20; // g
                costPerCup = 7; // Unité monétaire par tasse
                break;
            case 'cappuccino':
                waterNeeded = 200; // ml
                milkNeeded = 100; // ml
                coffeeBeansNeeded = 12; // g
                costPerCup = 6; // Unité monétaire par tasse
                break;
            default:
                alert('Type de café non reconnu. Veuillez choisir entre expresso, latte ou cappuccino.');
                return; // Ne rien faire si le type de café n'est pas reconnu
        }
    
        const totalWaterNeeded = waterNeeded * numberOfCups;
        const totalMilkNeeded = milkNeeded * numberOfCups;
        const totalCoffeeBeansNeeded = coffeeBeansNeeded * numberOfCups;
        const totalCost = costPerCup * numberOfCups;
    
        // Vérifier les stocks avant d'acheter
        if (
            waterSupply >= totalWaterNeeded &&
            milkSupply >= totalMilkNeeded &&
            coffeeBeansSupply >= totalCoffeeBeansNeeded &&
            cupsSupply >= numberOfCups &&
            customerMoney >= totalCost
        ) {
            // Déduire les fournitures et l'argent après l'achat
            waterSupply -= totalWaterNeeded;
            milkSupply -= totalMilkNeeded;
            coffeeBeansSupply -= totalCoffeeBeansNeeded;
            cupsSupply -= numberOfCups;
            customerMoney -= totalCost;
            moneyInMachine += totalCost;

        // Afficher un message de confirmation
        alert(`Vous avez acheté ${numberOfCups} tasse(s) de ${coffeeType}.`);
        alert(`argent restant ${customerMoney} euros`);
        displaySteps();
    } else {
        alert("Stock insuffisant ou solde insuffisant. Veuillez vérifier les fournitures et l'argent dans la machine.");
    }
}


    
    

    function fillSupplies() {
        // Demander la quantité d'eau
        const waterToAdd = parseInt(prompt('Quantité d\'eau à ajouter (en ml):'), 10) || 0;
    
        // Demander la quantité de lait
        const milkToAdd = parseInt(prompt('Quantité de lait à ajouter (en ml):'), 10) || 0;
    
        // Demander la quantité de café
        const coffeeToAdd = parseInt(prompt('Quantité de café à ajouter (en g):'), 10) || 0;
    
        // Demander le nombre de tasses jetables
        const cupsToAdd = parseInt(prompt('Nombre de tasses jetables à ajouter:'), 10) || 0;
    
        // Ajouter les fournitures
        waterSupply += waterToAdd;
        milkSupply += milkToAdd;
        coffeeBeansSupply += coffeeToAdd;
        cupsSupply += cupsToAdd;
    
        // Afficher un message de confirmation
        alert(`Fournitures ajoutées : ${waterToAdd} ml d'eau, ${milkToAdd} ml de lait, ${coffeeToAdd} g de café. ${cupsToAdd} tasses jetables ajoutées.`);
    }
    

    function takeMoney() {
        // Donner tout l'argent gagné
        alert(`Vous avez pris ${moneyInMachine} euros gagnés en vendant du café.`);
        customerMoney += moneyInMachine;
        moneyInMachine = 0;
    }

    function displaySuppliesQuantities() {
        const suppliesDisplay = `À l'heure actuelle, la machine à café contient :\n
            - Argent dans la machine : ${moneyInMachine} €\n
            - Approvisionnement en eau : ${waterSupply} ml\n
            - Approvisionnement en lait : ${milkSupply} ml\n
            - Approvisionnement en grains de café : ${coffeeBeansSupply} g\n
            - Nombre de tasses jetables : ${cupsSupply}`;
        
        alert(suppliesDisplay);
    }
    
