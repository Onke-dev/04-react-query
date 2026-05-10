import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../ReactPaginate/ReactPaginate";

function App() {
  const [movies, setMovie] = useState("");
  const [page, setPage] = useState(0);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", movies, page],
    queryFn: () => fetchMovies({ query: movies, page }),
    enabled: movies !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.length ?? 0;

  const handleSubmit = async (movie: string) => {
    setMovie(movie);
    setPage(1);
  };

  const openModal = (movie: Movie) => {
    setSelectMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectMovie(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isSuccess && totalPages > 1 && (
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      )}
      {data && data.length > 0 && (
        <MovieGrid
          movies={data}
          onSelect={(movie: Movie) => openModal(movie)}
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && selectMovie && (
        <MovieModal onClose={closeModal} movie={selectMovie} />
      )}
    </>
  );
}

export default App;
