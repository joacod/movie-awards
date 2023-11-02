import { fetchFromMoviesAPI } from '$lib/utils/api';

export async function GET({ params }) {
	const { name } = params;
	const response = await fetchFromMoviesAPI('imdb_id/byTitle', name);

	return response;
}
