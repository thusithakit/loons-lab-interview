import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { FilterAlt, RestartAlt, Star } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setFilters, discoverMoviesRequest } from '../store/actions/movieActions';
import type { MovieFilters } from '../types';

interface FilterControlsProps {
  onApply?: () => void;
}

export default function FilterControls({ onApply }: FilterControlsProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { filters, genres } = useAppSelector((s) => s.movies);

  // Local state buffer for draft filters - changes do NOT trigger API calls until Apply is clicked
  const [draftFilters, setDraftFilters] = useState<MovieFilters>(filters);

  // Sync draft state with Redux filters when Redux state changes externally (e.g. reset)
  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

  const handleApply = () => {
    dispatch(setFilters(draftFilters));
    dispatch(discoverMoviesRequest(draftFilters, 1));
    if (onApply) onApply();
  };

  const handleReset = () => {
    const defaultFilters: MovieFilters = {
      genre: null,
      year: null,
      minRating: null,
      sortBy: 'popularity.desc',
    };
    setDraftFilters(defaultFilters);
    dispatch(setFilters(defaultFilters));
    dispatch(discoverMoviesRequest(defaultFilters, 1));
    if (onApply) onApply();
  };

  const hasActiveFilters =
    draftFilters.genre !== null || draftFilters.year !== null || draftFilters.minRating !== null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Genre Filter */}
      <FormControl size="small" fullWidth>
        <InputLabel id="genre-select-label" sx={{ color: theme.palette.text.secondary }}>
          Genre
        </InputLabel>
        <Select
          labelId="genre-select-label"
          value={draftFilters.genre || ''}
          label="Genre"
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              genre: e.target.value ? Number(e.target.value) : null,
            }))
          }
          sx={{ color: theme.palette.text.primary, borderRadius: 1 }}
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Release Year Filter */}
      <FormControl size="small" fullWidth>
        <InputLabel id="year-select-label" sx={{ color: theme.palette.text.secondary }}>
          Release Year
        </InputLabel>
        <Select
          labelId="year-select-label"
          value={draftFilters.year || ''}
          label="Release Year"
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              year: e.target.value ? Number(e.target.value) : null,
            }))
          }
          sx={{ color: theme.palette.text.primary, borderRadius: 1 }}
        >
          <MenuItem value="">Any Year</MenuItem>
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Minimum Rating Slider */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
            Minimum Rating:
          </Typography>
          <Star sx={{ fontSize: 16, color: '#FFD700' }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
            {draftFilters.minRating || 0} / 10
          </Typography>
        </Box>
        <Slider
          value={draftFilters.minRating || 0}
          onChange={(_, val) =>
            setDraftFilters((prev) => ({
              ...prev,
              minRating: val as number,
            }))
          }
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
          size="small"
          sx={{ color: 'secondary.main' }}
        />
      </Box>

      {/* Sort By Filter */}
      <FormControl size="small" fullWidth>
        <InputLabel id="sort-select-label" sx={{ color: theme.palette.text.secondary }}>
          Sort By
        </InputLabel>
        <Select
          labelId="sort-select-label"
          value={draftFilters.sortBy}
          label="Sort By"
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              sortBy: e.target.value,
            }))
          }
          sx={{ color: theme.palette.text.primary, borderRadius: 1 }}
        >
          <MenuItem value="popularity.desc">Popularity (High → Low)</MenuItem>
          <MenuItem value="popularity.asc">Popularity (Low → High)</MenuItem>
          <MenuItem value="vote_average.desc">Rating (High → Low)</MenuItem>
          <MenuItem value="vote_average.asc">Rating (Low → High)</MenuItem>
          <MenuItem value="primary_release_date.desc">Release Date (Newest)</MenuItem>
          <MenuItem value="primary_release_date.asc">Release Date (Oldest)</MenuItem>
        </Select>
      </FormControl>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<FilterAlt />}
          onClick={handleApply}
          sx={{
            background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
            color: '#FFF',
            fontWeight: 700,
            borderRadius: 1,
          }}
        >
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="outlined"
            startIcon={<RestartAlt />}
            onClick={handleReset}
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              borderRadius: 1,
            }}
          >
            Reset
          </Button>
        )}
      </Box>
    </Box>
  );
}
