<script>
	import { onMount } from 'svelte';
	import Spinner from '$lib/components/Spinner.svelte';

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

<div class="flex justify-center items-center mb-6">
	<svg
		width="40"
		height="40"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
		<path d="M8 4l0 16" />
		<path d="M16 4l0 16" />
		<path d="M4 8l4 0" />
		<path d="M4 16l4 0" />
		<path d="M4 12l16 0" />
		<path d="M16 8l4 0" />
		<path d="M16 16l4 0" />
	</svg>
	<h1 class="text-5xl font-semibold text-center ml-2">Movie Awards</h1>
</div>

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
		<Spinner />
	{:else if searchedName !== '' && results.length === 0}
		<p>No movies found with the name "{searchedName}"</p>
	{:else}
		<ul>
			{#each results as movie}
				<li
					class="my-3 px-5 py-2 cursor-pointer bg-white text-[#00adb5] rounded hover:bg-[#00adb5] hover:text-white"
				>
					<a href="{movie.imdb_id}/awards?movie={movie.title}"
						>➡️<span class="pl-2">{movie.title}</span></a
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
