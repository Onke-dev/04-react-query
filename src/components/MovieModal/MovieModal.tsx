import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import { useEffect } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", escape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const hadleCloseModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <>
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={hadleCloseModalClick}
      >
        <div className={css.modal}>
          <button
            className={css.closeButton}
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className={css.image}
          />
          <div className={css.content}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date: {movie.release_date}</strong>
            </p>
            <p>
              <strong>Rating: {movie.vote_average}</strong>
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default MovieModal;
