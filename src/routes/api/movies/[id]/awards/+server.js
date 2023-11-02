import { fetchFromMoviesAPI } from '$lib/utils/api';

export async function GET({ params }) {
	const { id } = params;
	const response = await fetchFromMoviesAPI('id', `${id}/awards`);
	return response;
}
