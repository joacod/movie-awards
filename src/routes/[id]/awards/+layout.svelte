<script>
	import { goto } from '$app/navigation';
</script>

<button
	class="absolute top-4 left-4 bg-[#00adb5] text-white rounded px-4 py-4 hover:bg-[#068c92]"
	on:click={() => goto('/')}
>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M5 12l-2 0l9 -9l9 9l-2 0" />
		<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
		<path d="M10 12h4v4h-4z" />
	</svg>
</button>

<slot />
