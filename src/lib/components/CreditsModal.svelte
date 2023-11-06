<script>
	export let toggleModal;
</script>

<div
	class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
>
	<div class="bg-white p-4 text-sm rounded flex flex-col items-center justify-center">
		<h2 class="mb-5 text-lg font-bold">Credits</h2>
		<div class="mb-3">
			<p>
				<a
					class="underline"
					href="https://github.com/joacod/movie-awards"
					target="_blank"
					rel="noopener noreferrer"
					title="Movie Awards on GitHub"
				>
					Movie Awards
				</a>{' '}
				created by{' '}
				<a
					class="underline"
					href="https://github.com/joacod"
					target="_blank"
					rel="noopener noreferrer"
					title="Joaquin Diaz on GitHub"
				>
					Joaquin Diaz
				</a>
			</p>
		</div>
		<ul>
			<li>
				Favicon from
				<a
					class="underline"
					href="https://icons8.com/icons/set/clapper"
					target="_blank"
					rel="noopener noreferrer"
					title="Shots.so website"
				>
					icons8.com
				</a>
			</li>
			<li>
				Icons from
				<a
					class="underline"
					href="https://tabler-icons.io/"
					target="_blank"
					rel="noopener noreferrer"
					title="tabler-icons.io website"
				>
					tabler-icons.io
				</a>
			</li>
			<li>
				Movies api
				<a
					class="underline"
					href="https://rapidapi.com/SAdrian/api/moviesminidatabase/"
					target="_blank"
					rel="noopener noreferrer"
					title="UAParser website"
				>
					rapidapi.com
				</a>
			</li>
		</ul>

		<button
			class="mt-6 bg-[#00adb5] text-white rounded px-4 py-2 hover:bg-[#068c92]"
			on:click={toggleModal}>Close</button
		>
	</div>
</div>
