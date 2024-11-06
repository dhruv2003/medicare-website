import { useEffect, useContext } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  AccordionActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlarmsContext } from '../context/AlarmsContext';

function UpcomingAlarms() {
  const { alarms, setAlarms } = useContext(AlarmsContext);

  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    setAlarms(storedAlarms);
  }, [setAlarms]);

  const deleteAlarm = (id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  const sortedAlarms = alarms
    .filter((alarm) => new Date(alarm.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" fontWeight="700" color='primary'>
        Upcoming Alarms
      </Typography>
      {sortedAlarms.map((alarm, index) => (
        <Accordion
          key={index}
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              display: 'flex',
              borderBottom: 'none',
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="600">
                {alarm.title}
              </Typography>
              <Typography variant="h6">
                {new Date(alarm.dateTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </Typography>
              <Typography variant="body2">
                {new Date(alarm.dateTime).toDateString()}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                whiteSpace: 'pre-line',
              }}
            >
              {alarm.description}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button
              aria-label="delete"
              onClick={() => deleteAlarm(alarm.id)}
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              fullWidth
            >
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </Box>
  );
}

export default UpcomingAlarms;
