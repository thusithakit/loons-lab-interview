import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Box, InputBase, IconButton, useTheme } from '@mui/material';
import { Search as SearchIcon, Close } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { clearSearch } from '../store/actions/movieActions';

interface SearchBarProps {
  onClose?: () => void;
  fullWidth?: boolean;
}

export default function SearchBar({ onClose, fullWidth = false }: SearchBarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const lastQuery = useAppSelector((s) => s.movies.searchQuery);
  const [input, setInput] = useState(lastQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
      if (onClose) onClose();
    }
  };

  const handleClear = () => {
    setInput('');
    dispatch(clearSearch());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: alpha(theme.palette.text.primary, 0.06),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2.5,
        px: 1.5,
        py: 0.5,
        width: fullWidth ? '100%' : { xs: '100%', sm: 300 },
        transition: 'all 0.25s ease',
        '&:focus-within': {
          borderColor: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
      <InputBase
        autoFocus
        placeholder="Search movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          flex: 1,
          fontSize: '0.9rem',
          color: theme.palette.text.primary,
        }}
        inputProps={{ 'aria-label': 'search movies' }}
      />
      {input && (
        <IconButton size="small" onClick={handleClear}>
          <Close fontSize="small" sx={{ color: theme.palette.text.secondary }} />
        </IconButton>
      )}
      {onClose && (
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" sx={{ color: theme.palette.text.secondary }} />
        </IconButton>
      )}
    </Box>
  );
}
