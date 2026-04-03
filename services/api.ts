export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
};

const queryMovies = async (query: string) => {
    const response = await fetch(
        `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
            query,
        )}`,
        {
            headers: TMDB_CONFIG.headers,
            method: "GET",
        },
    );

    if (!response.ok) {
        // @ts-ignore
        throw new Error("Failed to fetch movies", response.statusText);
    }
};

export const getMovies2 = async (formData: {
    page: number;
    sort_by: string;
}) => {
    const queryString = new URLSearchParams(
        Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
                key,
                String(value),
            ]),
        ),
    ).toString();
    const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?${queryString}`;

    const response = await fetch(`${endpoint}`, {
        headers: TMDB_CONFIG.headers,
        method: "GET",
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error("Failed to fetch movies", response.statusText);
    }
    const data = await response.json();
    return data.results;
};
export const getMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
              query,
          )}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(`${endpoint}`, {
        headers: TMDB_CONFIG.headers,
        method: "GET",
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error("Failed to fetch movies", response.statusText);
    }
    const data = await response.json();
    return data.results;
};

export const getPopluarMovies = async () => {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/top_rated`, {
        headers: TMDB_CONFIG.headers,
        method: "GET",
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error("Failed to fetch trending movies", response.statusText);
    }
    const data = await response.json();
    // console.log(data.results)
    return data.results;
};

export const getMovieDetails = async (
    movieId: string,
): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                headers: TMDB_CONFIG.headers,
                method: "GET",
            },
        );

        if (!response.ok) {
            throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        return data as MovieDetails;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer '
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
