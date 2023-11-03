<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Movie Awards</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen bg-[#222831]">
	<div class="w-full max-w-3xl p-4 text-[#eeeeee]">
		<slot />
	</div>
</div>
