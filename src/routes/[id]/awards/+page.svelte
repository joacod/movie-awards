<script>
	import { onMount } from 'svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data;

	let awards = null;
	let winners = [];
	let nominees = [];
	let loading = true;
	let activeTable = 'winner';

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

<h1 class="text-4xl font-semibold text-center mb-5">Awards</h1>
<h2 class="text-2xl font-semibold text-center mb-10">{data.movieName}</h2>

{#if loading}
	<div class="flex justify-center">
		<Spinner />
	</div>
{:else if awards && awards.results.length === 0}
	<p class="text-center">No awards found.</p>
{:else}
	<div class="flex flex-col items-center justify-center">
		<div class="flex justify-center space-x-5 mb-5">
			<button
				class={`${
					activeTable === 'winner' ? 'bg-[#00adb5] text-white' : 'bg-background'
				} inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 border-[#00adb5] text-[#00adb5] hover:bg-[#00adb5] hover:text-white`}
				on:click={() => (activeTable = 'winner')}>Winner</button
			>
			<button
				class={`${
					activeTable === 'nominee' ? 'bg-[#00adb5] text-white' : 'bg-background'
				} inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 border-[#00adb5] text-[#00adb5] hover:bg-[#00adb5] hover:text-white`}
				on:click={() => (activeTable = 'nominee')}>Nominee</button
			>
		</div>
		<div class="flex flex-col mt-4">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden sm:rounded-lg">
						<table class="min-w-full text-sm text-gray-400">
							<thead class="bg-[#00adb5] text-white text-sm uppercase font-medium">
								<tr>
									<th scope="col" class="px-6 py-3 text-left tracking-wider">Award Name</th>
									<th scope="col" class="px-6 py-3 text-left tracking-wider">Year</th>
									<th scope="col" class="px-6 py-3 text-left tracking-wider">Category</th>
									<th scope="col" class="px-6 py-3 text-left tracking-wider">Event</th>
								</tr>
							</thead>
							<tbody class="bg-gray-800">
								{#if activeTable === 'winner'}
									{#each winners as item, i}
										<tr
											class:bg-black={i % 2 === 0}
											class:bg-opacity-20={i % 2 === 0}
											class:bg-transparent={i % 2 !== 0}
										>
											<td class="px-6 py-4 whitespace-nowrap">{item.award_name}</td>
											<td class="px-6 py-4 whitespace-nowrap">{item.year}</td>
											<td class="px-6 py-4 whitespace-nowrap">{item.award}</td>
											<td class="px-6 py-4 whitespace-nowrap">{item.event_name}</td>
										</tr>
									{/each}
								{:else if activeTable === 'nominee'}
									{#each nominees as item, i}
										<tr
											class:bg-black={i % 2 === 0}
											class:bg-opacity-20={i % 2 === 0}
											class:bg-transparent={i % 2 !== 0}
										>
											<td class="px-6 py-4 whitespace-nowrap">{item.award_name}</td>
											<td class="px-6 py-4 whitespace-nowrap">{item.year}</td>
											<td class="px-6 py-4 whitespace-nowrap">{item.award}</td>
											<td class="px-6 py-4 whitespace-nowrap">{item.event_name}</td>
										</tr>
									{/each}
								{/if}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
