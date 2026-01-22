import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}

export const fetchMovie = async (query: string): Promise<Movie[]> => {
  const config = {
    params: {
      query,
    },
    headers: {
      Autorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: "application/json",
    },
  };
  const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    config,
  );
  return response.data.results;
};
