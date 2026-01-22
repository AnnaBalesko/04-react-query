import axios from "axios";
import type { Movie } from "../types/movie";
interface MoviesRespons {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: "application/json",
    },
  };
  const response = await axios.get<MoviesRespons>(
    "https://api.themoviedb.org/3/search/movie",
    config,
  );
  return response.data.results;
};
