<script>
	import Router from "svelte-spa-router";
	import routes from "./routes.js";
</script>

<!-- master container -->
<div class="bg-gray-900 h-screen w-screen">
	<!-- nav bar with add button and text -->
	<nav class="bg-gray-800 flex items-center z-10">
		<p class="text-white px-5 py-3 text-xl font-bold">CARDOS</p>
	</nav>
	<Router {routes}/>
</div><!-- master container -->