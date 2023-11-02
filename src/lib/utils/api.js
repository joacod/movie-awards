import { MOVIES_API_KEY, MOVIES_API_HOST } from '$env/static/private';

const baseUrl = 'https://moviesminidatabase.p.rapidapi.com/movie';

export async function fetchFromMoviesAPI(endpoint, params) {
	const url = `${baseUrl}/${endpoint}/${params}`;
	const response = await fetch(url, {
		headers: {
			'X-RapidAPI-Key': MOVIES_API_KEY,
			'X-RapidAPI-Host': MOVIES_API_HOST
		}
	});

	return response;
}
