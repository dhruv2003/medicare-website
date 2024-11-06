import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
        bgcolor: 'primary.light',
        color: 'white',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <Typography
        fontSize="1rem"
        fontWeight="600"
        sx={{
          top: '1.5rem',
        }}
      >
        Powered by 💊 MediCare
      </Typography>
      <Typography variant="h2" fontWeight="900">
        {currentTime.toLocaleTimeString()}
      </Typography>
      <Typography variant="h5" fontWeight="600">
        {currentTime.toDateString()}
      </Typography>
    </Box>
  );
};

export default LiveClock;
