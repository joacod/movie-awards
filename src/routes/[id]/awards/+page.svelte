<script>
	import { onMount } from 'svelte';

	export let data;

	let awards = null;

	onMount(async () => {
		const response = await fetch(`/api/movies/${data.movieId}/awards`);
		awards = await response.json();
	});
</script>

<h1>{data.movieName} Awards</h1>

{#if awards}
	<ul>
		{#each awards.results as award}
			<li>{award.award_name}</li>
		{/each}
	</ul>
{/if}
