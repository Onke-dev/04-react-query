import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const response = await fetchMovies(query);
      if (response.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(response);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
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
      <MovieGrid
        movies={movies}
        onSelect={(movie: Movie) => openModal(movie)}
      />
      {isLoading && <Loader />}
      {isModalOpen && selectMovie && (
        <MovieModal onClose={closeModal} movie={selectMovie} />
      )}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
