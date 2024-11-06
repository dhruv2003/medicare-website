import { AddAlarm, AlarmAdd, Close } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AlarmsContext } from '../context/AlarmsContext';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';
import AlarmAlert from './AlarmAlert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SetAlarm() {
  const { alarms, setAlarms } = useContext(AlarmsContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [triggeredAlarm, setTriggeredAlarm] = useState(null);
  const databaseRef = ref(db, 'test/int');

  const audioRef = useRef(null); // Ref for audio object

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setDate(dayjs());
    setTime(dayjs());
  };

  const handleSave = () => {
    const dateTime = date.hour(time.hour()).minute(time.minute()).second(0);
    const id = uuidv4();
    const newAlarm = { id, title, description, dateTime: dateTime.toString() };

    const updatedAlarms = [...alarms, newAlarm];
    setAlarms(updatedAlarms);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));

    handleClose();
  };

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      alarms.forEach((alarm) => {
        if (new Date(alarm.dateTime) <= now && !alarmTriggered) {
          setTriggeredAlarm(alarm);
          setAlarmTriggered(true);

          set(databaseRef, 1)
            .then(() => {
              console.log('Data saved successfully!');
            })
            .catch((error) => {
              console.error('Error saving data:', error);
            });
          // Initialize audio if it's not already created
          if (!audioRef.current) {
            audioRef.current = new Audio('/sound.mp3');
          }

          // Play the sound
          audioRef.current.play();
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms, alarmTriggered, databaseRef]);

  const handleAlarmClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAlarmTriggered(false);
    setTriggeredAlarm(null);

    set(databaseRef, 0)
      .then(() => {
        console.log('Data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });

    const updatedAlarms = alarms.filter(
      (alarm) => alarm.id !== triggeredAlarm.id
    );
    setAlarms(updatedAlarms);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          startIcon={
            <AlarmAdd
              sx={{
                scale: 1.5,
                marginRight: '0.5rem',
              }}
            />
          }
          fullWidth
          sx={{
            bgcolor: '#FFC107',
            color: '#000000',
            fontWeight: 600,
            fontSize: '1.5rem',
            borderRadius: 2,
            p: 2,
            '&:hover': {
              bgcolor: '#FFA000',
            },
          }}
          onClick={handleClickOpen}
        >
          Schedule Alarm
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          sx={{
            '& .MuiDialog-paper': {
              backgroundImage: 'unset',
            },
          }}
        >
          <DialogContent sx={{ padding: 0 }}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <AddAlarm />
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Schedule Alarm
                </Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  autoFocus
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container
              sx={{ display: 'flex', flexDirection: 'column', mt: 4, gap: 3 }}
            >
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                multiline={true}
                minRows={3}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  label="Date"
                  renderInput={(params) => (
                    <TextField {...params} size="medium" sx={{ mt: 2 }} />
                  )}
                />
                <MobileTimePicker
                  value={time}
                  onChange={(newTime) => setTime(newTime)}
                  label="Time"
                  renderInput={(params) => (
                    <TextField {...params} size="medium" sx={{ mt: 2 }} />
                  )}
                />
              </LocalizationProvider>
            </Container>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              padding: 2,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSave}
              startIcon={<AlarmAdd />}
            >
              Set Alarm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <AlarmAlert
        alarmTriggered={alarmTriggered}
        triggeredAlarm={triggeredAlarm}
        handleAlarmClose={handleAlarmClose}
      />
    </>
  );
}

export default SetAlarm;
