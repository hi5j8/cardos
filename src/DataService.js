/**
 * DataService.js
 * 
 * Creates persistent data storage using browser cookies.
 */

// cookie storage for cards
const COOKIE_CARDS = "cardos_user_cards_v1";

// cards collection based functions

/**
 * Loads all cards saved in the cards cookie storage.
 */
export function readCards() {
    let foundCookies = document.cookie.split(";");

    // Loop through the array elements
    for(var i = 0; i < foundCookies.length; i++) {
       	var cookiePair = foundCookies[i].split("=");
        
       	/* Removing whitespace at the beginning of the cookie name
       	and compare it with the given string */
       	if(COOKIE_CARDS == cookiePair[0].trim()) {
           	// Decode the cookie value and return
			let cookieDecoded = decodeURIComponent(cookiePair[1]);
			let cookieData = unescape(cookieDecoded.split(","));
			let cards = JSON.parse(cookieData);
            return cards;
       	}
	}
	// return null if not found
	return null;
}

/**
 * Saves data to the cards cookie.
 * 
 * @param data      Data to be saved 
 */
 function saveCardsCookie(data) {
    document.cookie = COOKIE_CARDS + "=" + escape(JSON.stringify(data)) + "; SameSite=Strict; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

// per card based functions

/**
 * Adds a new card to the cards cookie storage.
 * 
 * @param card  The card that will be added to the storage 
 */
export function createCard(card) {
    let cards = readCards();
    cards = [...cards, card];
    saveCardsCookie(cards);
}

/**
 * Loads a card based off a given id from the cards cookie.
 * 
 * @param id    The id of the target card
 */
 export function readCard(id) {
    let cards = readCards();
    if(cards == null) {
        return null;
    }
    let filteredCards = cards.filter(item => item.id == id);
    return filteredCards[0];
}

/**
 * Updates a card in the cards cookie storage.
 * 
 * @param card      A card object which will be replaced in the cards storage based off its id
 */
export function updateCard(card) {
    let cards = readCards();
    // replace card with new, edited version
	let cardIdx = cards.findIndex(item => item.id == card.id);
	if(cardIdx != -1) {
		cards[cardIdx] = card;
	}
    // save data in cookie
    saveCardsCookie(cards);
}

/**
 * Deletes a card from the cards cookie storage.
 * 
 * @param id    The id of the target card
 */
export function deleteCard(id) {
    let cards = readCards();
    cards = cards.filter(item => item.id !== id);
    saveCardsCookie(cards);
}