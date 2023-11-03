export function load({ url, params }) {
	return {
		movieId: params.id,
		movieName: url.searchParams.get('movie')
	};
}
