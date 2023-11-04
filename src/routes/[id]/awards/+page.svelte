<script>
	import { onMount } from 'svelte';

	export let data;

	let awards = null;
	let loading = true;

	onMount(async () => {
		const response = await fetch(`/api/movies/${data.movieId}/awards`);
		awards = await response.json();
		loading = false;
	});
</script>

<svelte:head>
	<title>Movie Awards - {data.movieName}</title>
</svelte:head>

<h1 class="text-4xl font-semibold text-center mb-2">{data.movieName}</h1>
<h2 class="text-2xl font-semibold text-center mb-6">Awards</h2>

{#if loading}
	<div class="flex justify-center items-center">
		<div class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500" />
	</div>
{:else if awards && awards.results.length === 0}
	<p class="text-center">No awards found.</p>
{:else}
	<ul>
		{#each awards.results as award}
			<li>{award.award_name}</li>
		{/each}
	</ul>
{/if}
