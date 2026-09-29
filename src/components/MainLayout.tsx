import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import FilterSidebar from './FilterSidebar';
import ErrorAlert from './ErrorAlert';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenFilterSidebar={() => setSidebarOpen(true)} />

      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      <FilterSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <ErrorAlert />
    </Box>
  );
}
