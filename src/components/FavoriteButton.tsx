import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { toggleFavorite } from '../store/actions/movieActions';
import type { Movie } from '../types';

interface FavoriteButtonProps {
  movie: Movie;
  size?: 'small' | 'medium';
}

export default function FavoriteButton({ movie, size = 'small' }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.movies.favorites);
  const isFavorite = favorites.some((f) => f.id === movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  return (
    <IconButton
      onClick={handleClick}
      size={size}
      sx={{
        bgcolor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        '&:hover': { bgcolor: 'rgba(229,9,20,0.85)' },
        transition: 'all 0.2s',
      }}
    >
      {isFavorite ? (
        <Favorite sx={{ color: '#E50914', fontSize: size === 'small' ? 20 : 24 }} />
      ) : (
        <FavoriteBorder sx={{ color: '#FFF', fontSize: size === 'small' ? 20 : 24 }} />
      )}
    </IconButton>
  );
}
