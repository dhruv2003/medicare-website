/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { Slide } from '@mui/material';
import { Alarm, AlarmOff } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlarmAlert = ({ alarmTriggered, triggeredAlarm, handleAlarmClose }) => {
  return (
    <Dialog
      fullScreen
      open={alarmTriggered}
      onClose={handleAlarmClose}
      TransitionComponent={Transition}
      sx={{
        color: '#000000',
        '& .MuiPaper-root': {
          bgcolor: '#FFC107',
        },
      }}
    >
      <DialogTitle textAlign="center">
        <Typography
          variant="h2"
          fontWeight="900"
          mt={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Alarm
            sx={{
              scale: 2.5,
              mr: 4,
            }}
          />
          Alarm Alert
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="600">
          {triggeredAlarm?.title}
        </Typography>
        <Typography variant="h6" mt={2} color="text.secondary">
          {triggeredAlarm?.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAlarmClose}
          sx={{ mt: 4 }}
          size="large"
          fullWidth
          startIcon={<AlarmOff />}
        >
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmAlert;
