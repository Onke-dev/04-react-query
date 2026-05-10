import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;

}

interface MovieResponseParams {
  page: number;
  query: string;
}

const token = import.meta.env.VITE_TMDB_TOKEN;

const fetchMovies = async ({
  query,
  page,
}: MovieResponseParams): Promise<Movie[]> => {
  const { data } = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data.results;
};

export default fetchMovies;
