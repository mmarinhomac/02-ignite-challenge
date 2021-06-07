import { createContext, ReactNode, useContext, useState } from 'react';

import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieContextData {
  movies: MovieProps[];
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
  handleFindAllGenres: () => Promise<void>;
  handleChangeGenre: (GenreInput: number) => Promise<void>;
}

interface MoviesProviderProps {
  children: ReactNode;
}

const MoviesContext = createContext<MovieContextData>(
  {} as MovieContextData
);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  async function handleFindAllGenres() {
    await api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }

  async function handleChangeGenre(selectedGenreId: number) {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }

  return (
    <MoviesContext.Provider value={{ selectedGenre, movies, genres, handleFindAllGenres, handleChangeGenre }}>
      { children }
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext);

  return context;
}
