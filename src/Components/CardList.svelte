<script>
    import {onMount} from "svelte";

    import Card from "./Card.svelte";
    import {createCard, deleteCard, readCards} from "../DataService.js";

    // uniform length of all Ids created for every new card
    const ID_LENGTH = 12;

    // cards loaded
    let loadedCards = [];

    /*
	 * When rendering the component into the DOM for the first time, load all data
	 * available from the database.
	 */
	onMount(async() => {
		loadedCards = readCards();
	});

    function addCard() {
        // sample card
        let newCard = {
            id: "",
            title: "Sample card",
            description: "Click to edit me!",
            created: new Date(Date.now()).toString(),
            updated: new Date(Date.now()).toString(),
            due: null
        }
        // set new id
        newCard.id = createId(ID_LENGTH);

        // add locally
        loadedCards = [...loadedCards, newCard];
        // add to storage
        createCard(newCard);
    }

    function removeCard(e) {
        let id = e.detail;
        // remove locally
        loadedCards = loadedCards.filter(item => item.id !== id);
        // remove from storage
        deleteCard(id);
    }

    /**
     * Creates a random Id consisting of letters, numbers, "-" and "_".
     * 
     * @param length	The id length
     */
    function createId (length) {
        let id = "";
        let chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz01234567890-_";
        for (var i = 0; i < length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

</script>


<div class="px-10 py-10 flex flex-wrap content-start gap-6 z-10 bg-gray-900">
    {#each loadedCards as card}
        <Card item={card} on:deleteCard={removeCard}/>
    {/each}
    <!-- add new card button -->
    <div class="absolute bottom-0 left-0 mx-10 my-10">
        <div class="bg-green-700 hover:bg-green-600 text-green-200 font-bold py-3 px-3" title="New Card" on:click={addCard}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </div>
    </div>
</div>