import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { Person, Lock, Visibility, VisibilityOff, Movie as MovieIcon } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/useRedux';
import { loginRequest } from '../../store/actions/authActions';
import AuthLayout from '../../components/AuthLayout';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    dispatch(loginRequest(username.trim()));
    setLoading(false);
    navigate('/', { replace: true });
  };

  return (
    <AuthLayout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
            mb: 2,
            boxShadow: '0 8px 24px rgba(229,9,20,0.3)',
          }}
        >
          <MovieIcon sx={{ fontSize: 34, color: '#FFF' }} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
          }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
          Sign in to explore movies
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          autoComplete="username"
          autoFocus
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          autoComplete="current-password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            mb: 1,
            py: 1.5,
            background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
            color: '#FFF',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 8px 24px rgba(229,9,20,0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #B2070F 0%, #E50914 100%)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#FFF' }} /> : 'Sign In'}
        </Button>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: theme.palette.text.secondary }}>
          Enter any username and password to continue
        </Typography>
      </Box>
    </AuthLayout>
  );
}
