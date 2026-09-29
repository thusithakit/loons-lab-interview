import { Drawer, Box, Typography, IconButton, useTheme, Divider } from '@mui/material';
import { Close, Tune } from '@mui/icons-material';
import FilterControls from './FilterControls';

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ open, onClose }: FilterSidebarProps) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '85vw', sm: 360 },
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: '-8px 0 32px rgba(0,0,0,0.3)',
            p: 3,
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tune sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            Filter Movies
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close sx={{ color: theme.palette.text.secondary }} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <FilterControls onApply={onClose} />
    </Drawer>
  );
}
