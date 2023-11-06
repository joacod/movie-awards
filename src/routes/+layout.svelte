<script>
	import '../app.css';
	import CreditsModal from '../lib/components/CreditsModal.svelte';
	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<svelte:head>
	<title>Movie Awards</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen relative">
	<button
		class="absolute top-4 right-4 bg-[#00adb5] text-white text-sm rounded px-3 py-1 hover:bg-[#068c92]"
		on:click={() => (showModal = true)}>Credits</button
	>
	<div class="w-full px-40 py-10 text-[#eeeeee]">
		<slot />
	</div>
	{#if showModal}
		<CreditsModal {toggleModal} />
	{/if}
</div>
