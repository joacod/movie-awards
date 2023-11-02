<script>
    import { onMount } from 'svelte';
    
    let data = null;
    let name = 'the matrix';
    let results = [];
    
    onMount(async () => {
        const response = await fetch(`/api/movies/${encodeURIComponent(name)}`);
        data = await response.json();
        results = data.results;
    });
</script>

<h1>Movies Awards</h1>
<h2>{name}</h2>

{#each results as movie}
    <h3>{movie.imdb_id}</h3>
    <p>{movie.title}</p>
{/each}
