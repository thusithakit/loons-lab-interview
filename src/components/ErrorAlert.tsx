// =============================================================================
// ErrorAlert Component
// =============================================================================

import { Alert, AlertTitle, Button, Snackbar } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { clearError } from '../store/actions/movieActions';

interface ErrorAlertProps {
  onRetry?: () => void;
}

export default function ErrorAlert({ onRetry }: ErrorAlertProps) {
  const dispatch = useAppDispatch();
  const error = useAppSelector((s) => s.movies.error);

  if (!error) return null;

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={8000}
      onClose={() => dispatch(clearError())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="error"
        variant="filled"
        onClose={() => dispatch(clearError())}
        action={
          onRetry && (
            <Button color="inherit" size="small" startIcon={<Refresh />} onClick={onRetry}>
              Retry
            </Button>
          )
        }
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <AlertTitle>Something went wrong</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
}
