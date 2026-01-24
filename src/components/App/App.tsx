import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import type { MoviesRespons } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = async (query: string) => {
    setQuery(query);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<MoviesRespons>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query),
    placeholderData: keepPreviousData,
  });
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (query && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, query]);

  return (
    <div className={css.app}>
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
      <SearchBar onSubmit={handleSearch} />
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data && <MovieGrid onSelect={handleSelectMovie} movies={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      
      <Toaster />
    </div>
  );
}
