<script>
    import {onMount} from "svelte";
    import {push, pop, replace} from 'svelte-spa-router';

    // onMount (() => {replace("#/cards")});
</script>

<div class="text-white">
    <p class="text-white italic px-4 py-4 animate-pulse">Navigating you to your cards...</p>
    <button class="bg-gray-600 text-white font-bold py-2 px-4 cursor-pointer hover:bg-gray-500" on:click={push("#/cards")}>Navigate manually</button>
</div>