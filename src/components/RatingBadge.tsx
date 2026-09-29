// =============================================================================
// RatingBadge Component
// =============================================================================

import { Chip } from '@mui/material';
import { Star } from '@mui/icons-material';

interface RatingBadgeProps {
  rating: number | string;
  size?: 'small' | 'medium';
}

export default function RatingBadge({ rating, size = 'small' }: RatingBadgeProps) {
  const displayValue = typeof rating === 'number' ? rating.toFixed(1) : rating;

  return (
    <Chip
      icon={<Star sx={{ fontSize: 16, color: '#FFD700 !important' }} />}
      label={displayValue}
      size={size}
      sx={{
        bgcolor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '0.75rem',
        '& .MuiChip-icon': { ml: 0.5 },
      }}
    />
  );
}
