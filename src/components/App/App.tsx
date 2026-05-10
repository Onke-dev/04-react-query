import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../ReactPaginate/ReactPaginate";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", topic, page],
    queryFn: () => fetchMovies({ query: topic, page }),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (isSuccess && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const handleSubmit = async (movie: string) => {
    if (movie.trim().length === 0) {
      toast.error("Please enter a movie name.");
      return;
    }
    setTopic(movie);
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
      <Toaster position="top-center"/>
      <SearchBar onSubmit={handleSubmit} />
      {isSuccess && totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          forcePage={page}
          onPageChange={setPage}
        />
      )}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
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
