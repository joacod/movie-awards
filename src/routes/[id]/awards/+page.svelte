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

<div class="flex justify-center items-center mb-5">
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
		<path
			d="M19.496 13.983l1.966 3.406a1.001 1.001 0 0 1 -.705 1.488l-.113 .011l-.112 -.001l-2.933 -.19l-1.303 2.636a1.001 1.001 0 0 1 -1.608 .26l-.082 -.094l-.072 -.11l-1.968 -3.407a8.994 8.994 0 0 0 6.93 -3.999z"
			stroke-width="0"
			fill="currentColor"
		/>
		<path
			d="M11.43 17.982l-1.966 3.408a1.001 1.001 0 0 1 -1.622 .157l-.076 -.1l-.064 -.114l-1.304 -2.635l-2.931 .19a1.001 1.001 0 0 1 -1.022 -1.29l.04 -.107l.05 -.1l1.968 -3.409a8.994 8.994 0 0 0 6.927 4.001z"
			stroke-width="0"
			fill="currentColor"
		/>
		<path
			d="M12 2l.24 .004a7 7 0 0 1 6.76 6.996l-.003 .193l-.007 .192l-.018 .245l-.026 .242l-.024 .178a6.985 6.985 0 0 1 -.317 1.268l-.116 .308l-.153 .348a7.001 7.001 0 0 1 -12.688 -.028l-.13 -.297l-.052 -.133l-.08 -.217l-.095 -.294a6.96 6.96 0 0 1 -.093 -.344l-.06 -.271l-.049 -.271l-.02 -.139l-.039 -.323l-.024 -.365l-.006 -.292a7 7 0 0 1 6.76 -6.996l.24 -.004z"
			stroke-width="0"
			fill="currentColor"
		/>
	</svg>
	<h1 class="text-4xl font-semibold text-center ml-2">Awards</h1>
</div>
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
				on:click={() => (activeTable = 'winner')}
			>
				<svg
					class="mr-1"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="1.25"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M8 21l8 0" />
					<path d="M12 17l0 4" />
					<path d="M7 4l10 0" />
					<path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
					<path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
					<path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
				</svg>
				Winner</button
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
