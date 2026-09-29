// =============================================================================
// ThemeToggle Component
// =============================================================================

import { IconButton, Tooltip, useTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { toggleTheme } from '../store/actions/themeActions';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mode = useAppSelector((s) => s.theme.mode);

  return (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        sx={{
          color: theme.palette.text.primary,
          transition: 'color 0.2s',
        }}
      >
        {mode === 'dark' ? (
          <LightMode sx={{ color: '#F5C518' }} />
        ) : (
          <DarkMode sx={{ color: theme.palette.text.primary }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
