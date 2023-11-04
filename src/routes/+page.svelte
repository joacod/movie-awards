<script>
	import { onMount } from 'svelte';

	let inputElement;
	let data = null;
	let name = '';
	let searchedName = '';
	let results = [];
	let loading = false;
	let errorMessage = null;

	onMount(() => {
		inputElement.focus();
	});

	async function getMovieIdsByName() {
		errorMessage = null;
		loading = true;
		searchedName = name;
		const response = await fetch(`/api/movies/${encodeURIComponent(name)}`);
		data = await response.json();
		results = data.results;
		loading = false;
		name = '';
	}

	async function handleFormSubmit() {
		if (name.trim() === '') {
			errorMessage = 'Please provide a Movie name.';
			return;
		}

		await getMovieIdsByName();
		inputElement.focus();
	}
</script>

<svelte:head>
	<title>Movie Awards</title>
</svelte:head>

<h1 class="text-5xl font-semibold text-center mb-6">Movie Awards</h1>

<form on:submit|preventDefault={handleFormSubmit} class="my-10 flex items-center justify-center">
	<input
		bind:this={inputElement}
		bind:value={name}
		type="search"
		class="flex h-10 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-1/3 mr-2 border-[#393e46] text-[#222831] focus:border-[#00adb5]"
		placeholder="Enter movie name"
	/>
	<button
		disabled={loading}
		class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-10 px-4 py-2 border-[#00adb5] text-[#00adb5] hover:bg-[#00adb5] hover:text-[#222831]"
		type="submit"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class=" h-5 w-5"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	</button>
</form>

<div class="flex justify-center items-center">
	{#if errorMessage}
		<p class="text-red-500 text-lg font-bold">{errorMessage}</p>
	{:else if loading}
		<div class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500" />
	{:else if searchedName !== '' && results.length === 0}
		<p>No movies found with the name "{searchedName}"</p>
	{:else}
		<ul>
			{#each results as movie}
				<li>
					<a href="{movie.imdb_id}/awards?movie={movie.title}">{movie.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
