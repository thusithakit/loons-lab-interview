// =============================================================================
// Navbar Component
// =============================================================================

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon, FavoriteBorder, Tune } from '@mui/icons-material';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { logout } from '../store/actions/authActions';

interface NavbarProps {
  onOpenFilterSidebar?: () => void;
}

export default function Navbar({ onOpenFilterSidebar }: NavbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const user = useAppSelector((s) => s.auth.user);

  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      <Toolbar sx={{ gap: 1, px: { xs: 1.5, sm: 3 }, flexWrap: 'wrap', justifyContent: {sm: 'flex-end'} }}>
        <Logo />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            onClick={() => navigate('/')}
            size="small"
            sx={{
              color: location.pathname === '/' ? 'primary.main' : theme.palette.text.primary,
              fontWeight: location.pathname === '/' ? 800 : 600,
              fontSize: '0.9rem',
              transition: 'color 0.2s',
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate('/favorites')}
            size="small"
            startIcon={<FavoriteBorder sx={{ fontSize: 18 }} />}
            sx={{
              color: location.pathname === '/favorites' ? 'primary.main' : theme.palette.text.primary,
              fontWeight: location.pathname === '/favorites' ? 800 : 600,
              fontSize: '0.9rem',
              transition: 'color 0.2s',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
              Favorites
            </Box>
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {onOpenFilterSidebar && (
          <Tooltip title="Filter Movies">
            <IconButton
              onClick={onOpenFilterSidebar}
              sx={{ color: theme.palette.text.primary }}
            >
              <Tune />
            </IconButton>
          </Tooltip>
        )}

        {searchOpen ? (
          <SearchBar onClose={() => setSearchOpen(false)} />
        ) : (
          <Tooltip title="Search movies">
            <IconButton
              onClick={() => setSearchOpen(true)}
              sx={{ color: theme.palette.text.primary }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        )}

        <ThemeToggle />

        {user && (
          <>
            <Tooltip title={user.username}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: 'primary.main',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                  }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                },
              }}
            >
              <MenuItem disabled>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Signed in as <strong style={{ color: theme.palette.text.primary }}>{user.username}</strong>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  setAnchorEl(null);
                  navigate('/login');
                }}
              >
                Sign out
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
