<script>

    import {createEventDispatcher, onMount} from "svelte";
    import {push, pop, replace} from 'svelte-spa-router';

    import {readCard, updateCard, deleteCard} from "../DataService.js";

    // used to dispatch events w/ data to parent components
    const eventDispatcher = createEventDispatcher();

    // Router params, in this case the id for which the edit window should show up
    export let params = {};

    // card object, read data via DataService.js
    let item = readCard(params.id);

    // date and time from pickers
    let setDueDate;
    let setDueTime;

    /**
     * Loads due date from card into date and time pickers.
    */
    onMount(() => {
        setDateTimePickerValues(item.due);
    });

    /**
     * Edits the current card.
     */
    function onEdit() {
        // console.log("Dispatching card \"" + item.id + "\"!");
        // update card updated date
        item.updated = new Date(Date.now()).toString();

        // build set due date from set values
        if(setDueDate != null && setDueTime != null) {
            // console.log(setDueDate);
            // console.log(setDueTime);
            let setDue = new Date(
                setDueDate.substring(0, 4),             // year
                Number(setDueDate.substring(5, 7))-1,   // month
                setDueDate.substring(8, 10),            // day
                setDueTime.substring(0, 2),             // hours
                setDueTime.substring(3, 5),             // minutes
                0                                       // seconds
            );
            item.due = setDue.toString();
            // console.log(setDue.toString());
        } else {
            item.due = null;
        }

        // update data via data service
        updateCard(item);
        
        // navigate back to /#/cards
        push("#/cards");
    }

    /**
     * Removes the current card.
     */
    function onDelete() {
        deleteCard(item.id);
        push("#/cards");
    }

    /**
     * Closes the edit box and un-selects the card.
     */
    function onClose() {
        // navigate back to /#/cards via router, will unmount the component automatically
        pop();
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
        // formatting options
        let options = {
            day: "numeric",
            year: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };
        // return formatted date + time
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }

    /**
     * Clears the date and time pickers in the view by clearing the bound values.
     */
    function clearDue() {
        setDueDate = null;
        setDueTime = null;
    }

    /**
     * Sets the due date to the current timestamp.
     */
    function setDueNow() {
        setDateTimePickerValues(new Date(Date.now()));
    }

    /**
     * Updates the displayed values in both date and time picker by updating its bound values.
     * 
     * @param date  The date (including time) to be put into the date and time pickers
     */
    function setDateTimePickerValues(date) {
        if(date != null) {
            let dt = new Date(date);
            // format date and time for pickers in component
            // taken from: https://stackoverflow.com/a/10632399
            let datePickerDate = 
                `${dt.getFullYear().toString().padStart(4, '0')}-` +
                `${(dt.getMonth()+1).toString().padStart(2, '0')}-` + 
                `${dt.getDate().toString().padStart(2, '0')}`;
            let timePickerTime = 
                `${dt.getHours().toString().padStart(2, '0')}:` +
                `${dt.getMinutes().toString().padStart(2, '0')}`;
            setDueDate = datePickerDate;
            setDueTime = timePickerTime;
        } else {
            setDueDate = null;
            setDueTime = null;
        }
    }
</script>

<!-- master component container -->
<div class="z-15">
    <!-- slightly transparent screen between page and edit window -->
    <div class="absolute w-screen h-screen top-0 left-0 bg-gray-800 z-20 opacity-50" on:click={onClose}></div>
    <!-- right aside edit window -->
    <div class="bg-gray-700 w-3/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 h-screen px-10 py-10 absolute inset-y-0 right-0 z-30 flex-row">
        <!-- heading -->
        <p class="text-3xl text-white font-bold">Edit</p>
        <!-- card property fields -->
        <div class="py-8 space-y-4"> 
            <!-- title -->
            <div class="space-y-2">
                <p class="text-s text-white italic">title</p>
                <textarea id="cardTitle" name="cardTitle" rows="1" class="bg-gray-500 w-full text-white px-2 py-2" type="text" bind:value={item.title}/>
            </div> <!-- title -->
            <!-- description -->
            <div class="space-y-2">
                <p class="text-s text-white italic">description</p>
                <textarea id="cardDescription" name="cardTitle" rows="5" class="bg-gray-500 w-full text-white px-2 py-2" type="text" bind:value={item.description}/>
            </div> <!-- title -->
            <!-- due date -->
            <div class="space-y-2">
                <p class="text-s text-white italic">due date</p>
                <div class="flex flex-row justify-content-start items-center">
                    <input class="bg-gray-500 hover:bg-gray-600 text-s text-white px-2 py-2" type="date" id="cardDueDate" bind:value={setDueDate}>
                    <input class="bg-gray-500 hover:bg-gray-600 text-s text-white px-2 py-2" type="time" id="cardDueTime" bind:value={setDueTime}>
                    <!-- clear due icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ml-2 cursor-pointer opacity-50 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="white" on:click={clearDue}>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg> <!-- clear due icon -->
                    <!-- set time to now icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ml-2 cursor-pointer opacity-50 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="white" on:click={setDueNow}>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> <!-- set time to now icon -->
                </div>
            </div>
            <!-- metadata (id, created, updated) -->
            <div class=""> 
                <p class="text-s text-gray-400 italic">id: {item.id}</p>
                <p class="text-s text-gray-400 italic">card created: {formatDate(new Date(item.created))}</p>
                <p class="text-s text-gray-400 italic">last edited: {formatDate(new Date(item.updated))}</p>
            </div> <!-- metadata (id, created, updated) -->
        </div> <!-- card property fields -->
        <!-- button controls -->
        <div class="flex justify-between space-x-4">
            <div class="flex justify-start space-x-4">
                <button class="bg-gray-600 text-white font-bold py-2 px-4 cursor-pointer hover:bg-gray-500" on:click={onEdit}>Edit</button>
                <button class="bg-red-400 text-red-800 font-bold py-2 px-4 cursor-pointer hover:bg-red-600 hover:text-red-100" on:click={onDelete}>Delete Card</button>
            </div>
            <div class="flex justify-end">
                <button class="bg-gray-600 text-white font-bold py-2 px-4 cursor-pointer hover:bg-gray-500" on:click={onClose}>Close</button>
            </div>
        </div> <!-- button controls -->
    </div> <!-- right aside edit window -->
</div> <!-- master component container -->