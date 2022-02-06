import Home from "./Components/Home.svelte";
import CardList from "./Components/CardList.svelte";
import EditCard from "./Components/EditCard.svelte";

export default {
    "/": Home,
    "/cards": CardList,
    "/cards/:id": EditCard,
}