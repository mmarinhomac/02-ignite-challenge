import { useEffect, useState } from 'react';

import { useMovies } from '../hooks/MoviesContext';

import { Button } from '../components/Button';

import '../styles/sidebar.scss';

export function SideBar() {
  const { genres, handleFindAllGenres, handleChangeGenre } = useMovies();

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    handleFindAllGenres();
  }, []);

  useEffect(() => {
    handleChangeGenre(selectedGenreId);
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}