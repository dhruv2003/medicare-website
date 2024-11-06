import { Box, Divider } from '@mui/material';
import LiveClock from './components/LiveClock';
import SetAlarm from './components/SetAlarm';
import UpcomingAlarms from './components/UpcomingAlarms';
import { AlarmsProvider } from './context/AlarmsContext';
import StyleThemeProvider from './theme/ThemeProvider';

function App() {
  return (
    <StyleThemeProvider>
      <AlarmsProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            gap: 2,
          }}
        >
          <LiveClock />
          <SetAlarm />
          <Divider />
          <UpcomingAlarms />
        </Box>
      </AlarmsProvider>
    </StyleThemeProvider>
  );
}

export default App;
