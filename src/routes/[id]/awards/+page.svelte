<script>
	import { onMount } from 'svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data;

	let awards = null;
	let winners = [];
	let nominees = [];
	let loading = true;

	onMount(async () => {
		const response = await fetch(`/api/movies/${data.movieId}/awards`);
		awards = await response.json();
		loading = false;

		// slice the results into winners and nominees, ordered by year
		const splitResults = awards.results.reduce(
			(acc, current) => {
				if (current.type === 'Winner') {
					const index = acc.winners.findIndex((item) => item.year > current.year);
					if (index === -1) {
						acc.winners.push(current);
					} else {
						acc.winners.splice(index, 0, current);
					}
				} else if (current.type === 'Nominee') {
					const index = acc.nominees.findIndex((item) => item.year > current.year);
					if (index === -1) {
						acc.nominees.push(current);
					} else {
						acc.nominees.splice(index, 0, current);
					}
				}
				return acc;
			},
			{ winners: [], nominees: [] }
		);

		winners = splitResults.winners;
		nominees = splitResults.nominees;
	});
</script>

<svelte:head>
	<title>Movie Awards - {data.movieName}</title>
</svelte:head>

<h1 class="text-4xl font-semibold text-center mb-2">{data.movieName}</h1>
<h2 class="text-2xl font-semibold text-center mb-6">Awards</h2>

{#if loading}
	<div class="flex justify-center">
		<Spinner />
	</div>
{:else if awards && awards.results.length === 0}
	<p class="text-center">No awards found.</p>
{:else}
	<div class="flex justify-center content-center">
		<div>
			<h3 class="text-xl">Winner</h3>
			<ul>
				{#each winners as item}
					<li class="mt-4">
						<p>Award Name: {item.award_name}</p>
						<p>Year: {item.year}</p>
						<p>Category: {item.award}</p>
						<p>Event: {item.event_name}</p>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="text-xl">Nominee</h3>
			<ul>
				{#each nominees as item}
					<li class="mt-4">
						<p>Award Name: {item.award_name}</p>
						<p>Year: {item.year}</p>
						<p>Category: {item.award}</p>
						<p>Event: {item.event_name}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
