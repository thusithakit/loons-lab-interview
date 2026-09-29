// =============================================================================
// Heading Component
// =============================================================================

import { Typography, useTheme, type TypographyProps } from '@mui/material';

interface HeadingProps extends TypographyProps {
  children: React.ReactNode;
}

export default function Heading({ children, variant = 'h5', sx, ...props }: HeadingProps) {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      sx={{
        color: theme.palette.text.primary,
        fontWeight: 700,
        transition: 'color 0.2s ease',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
