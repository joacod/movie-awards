<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Movie Awards</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
	<div class="w-full px-40 py-10 text-[#eeeeee]">
		<slot />
	</div>
</div>
