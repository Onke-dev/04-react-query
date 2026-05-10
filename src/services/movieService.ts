import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}

const token = import.meta.env.VITE_TMDB_TOKEN;

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data.results;
};

export default fetchMovies;
