import { Chip } from '@mui/material';

interface GenreChipProps {
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function GenreChip({ label, onClick, selected = false }: GenreChipProps) {
  return (
    <Chip
      label={label}
      onClick={onClick}
      size="small"
      color={selected ? 'primary' : 'default'}
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: selected ? 'primary.main' : 'rgba(229,9,20,0.12)',
        color: selected ? '#FFF' : 'primary.main',
        border: '1px solid rgba(229,9,20,0.25)',
        '&:hover': onClick
          ? {
              bgcolor: 'primary.main',
              color: '#FFF',
            }
          : undefined,
        transition: 'all 0.2s ease',
      }}
    />
  );
}
