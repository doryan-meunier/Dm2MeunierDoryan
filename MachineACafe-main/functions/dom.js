
/**
 * Mes définitions
 * @typedef {title: string, duree: number} Etape
 * @property {string} title
 * @property {number} duree
 */


/**
 *
 * @param {string} tagName
 * @param {object} attributes
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }

    return element
}

/**
 * Injecte des éléments de type li avec des délais entre chaque étape
 * @param {[string]} lesEtapes - Les étapes à afficher
 * @param {HTMLElement} laListe - La liste à laquelle ajouter les éléments
 * @param {[number]} delays - Tableau de délais en millisecondes pour chaque étape
 */
export async function injectElements(lesEtapes, laListe, delays) {
    for (let i = 0; i < lesEtapes.length; i++) {
        let liListe = createElement('li');
        let durationText = `Étape ${i + 1} (${delays[i] || 0} ms) : ${lesEtapes[i]}`;
        liListe.innerText = durationText;
        laListe.append(liListe);

        if (delays && delays[i]) {
            await delay(delays[i]);
        }
    }
}




/**
 * Supprime si nécessaire un tag, puis le recréé
 * @param {string} tagName
 * @return {HTMLElement}
 */
export function renewTag(tagName) {
    const laListe = document.querySelector(tagName)
    if (laListe !== null) {
        laListe.remove()
    }
    return createElement(tagName)
}

/**
 * Permet d'ajouter un délai avant un traitement
 * @param {Number} duree en ms
 * @return {Promise<unknown>}
 */
export function delay(duree) {
    duree = duree || 2000;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duree);
    });
}