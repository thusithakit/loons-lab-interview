import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { getProfileUrl } from '../services/tmdb';
import type { CastMember } from '../types';

interface CastAvatarProps {
  cast: CastMember;
}

export default function CastAvatar({ cast }: CastAvatarProps) {
  const theme = useTheme();
  const profileUrl = getProfileUrl(cast.profile_path);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 100,
        textAlign: 'center',
      }}
    >
      <Avatar
        src={profileUrl || undefined}
        alt={cast.name}
        sx={{
          width: 80,
          height: 80,
          mb: 1,
          border: `2px solid ${theme.palette.divider}`,
          fontSize: '1.5rem',
          bgcolor: 'primary.dark',
          color: '#FFF',
        }}
      >
        {cast.name.charAt(0)}
      </Avatar>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 100,
        }}
      >
        {cast.name}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 100,
          fontSize: '0.65rem',
        }}
      >
        {cast.character}
      </Typography>
    </Box>
  );
}
