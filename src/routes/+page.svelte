<script>
    let data = null;
    let name = '';
    let results = [];
    
    async function getMovieIdsByName() {
        const response = await fetch(`/api/movies/${encodeURIComponent(name)}`);
        data = await response.json();
        results = data.results;
    };
</script>

<h1 class="text-4xl font-semibold text-center mb-6">Movie Awards</h1>

<div class="mb-8 flex items-center justify-center">
    <input
        bind:value={name}
        type="search"
        class="flex h-10 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-1/2 mr-2 border-[#393e46] text-[#222831] focus:border-[#00adb5]"
        placeholder="Search movie..."
    />
    <button
        on:click={getMovieIdsByName}
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
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
        </svg>
    </button>
</div>

{#each results as movie}
    <h3>{movie.imdb_id}</h3>
    <p>{movie.title}</p>
{/each}
