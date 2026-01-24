import axios from "axios";
import type { Movie } from "../types/movie";
export interface MoviesRespons {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (query: string, page:number): Promise<MoviesRespons> => {
  const config = {
    params: {
      query,
      page,
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
  return response.data;
};
