<script>
    import {createEventDispatcher} from "svelte";

    // used to dispatch events w/ data to parent components
    const eventDispatcher = createEventDispatcher();
    
    // card object
    export let item;

    /**
     * Removes the current card.
     */
    function onDelete() {
        // emit event and let parent component CardList handle deletion
        eventDispatcher("deleteCard", item.id);
        // push("#/cards");
    }

    /**
     * Formats a date to a representable string in the view component.
     * 
     * @param date      The specified Date object
     */
    function formatDate(date) {
        if(date == null) {
            return "";
        }
        // date is formatted as "1970-01-01 01-01-01" - needs to be converted first
        // let dateRegex = /\-|\s/g; // removes "-" and whitespaces
        // let dateFromDate = new Date(Number(String(date).replace(dateRegex, "")));

        // console.log(date);
        // console.log(Date.now());

        // return formatted date + time
        let options = {
            day: "numeric",
            year: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        return new Intl.DateTimeFormat('en-US', options).format(Date.parse(date));

    }
</script>

<!-- main container -->
<div class="bg-gray-800 h-32 w-64 max-w-md break-all flex flex-col place-content-between">
    <!-- card title -->
    <p class="text-m text-white overflow-hidden px-4 py-4">{item.title}</p> <!-- card title -->
    <!-- bottom of card controls -->
    <div class="flex flex-row justify-between items-end m-2">
        <!-- due date -->
        {#if item.due != null && ((new Date(item.due) - Date.now()) / 36e5) < 24 && ((new Date(item.due) - Date.now()) / 36e5) >= 0}
        <div class="bg-yellow-300 px-1 py-1">
            <p class="text-xs text-yellow-900 overflow-hidden italic">{formatDate(item.due)}</p> <!-- due date yellow -->
        </div>
        {:else if item.due != null && ((new Date(item.due) - Date.now()) / 36e5) < 0}
        <div class="bg-red-800 px-1 py-1">
            <p class="text-xs text-red-200 overflow-hidden italic">{formatDate(item.due)}</p> <!-- due date red -->
        </div>
        {:else}
        <p class="text-xs text-gray-300 overflow-hidden italic">{formatDate(item.due)}</p> <!-- due date -->
        {/if}
        <!-- quick-action icons -->
        <div class="flex flex-row items-end space-x-2">
            <!-- edit icon -->
            <a href="#/cards/{item.id}" class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-40 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </a> 
            <!-- delete icon -->
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-40 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="red" on:click={onDelete}>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div> <!-- delete icon -->
        </div> <!-- quick-action icons -->
    </div> <!-- bottom of card controls -->
</div> <!-- main container -->