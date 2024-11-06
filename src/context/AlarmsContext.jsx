/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AlarmsContext = createContext();

export const AlarmsProvider = ({ children }) => {
  const [alarms, setAlarms] = useState(
    JSON.parse(localStorage.getItem('alarms')) || []
  );

  return (
    <AlarmsContext.Provider value={{ alarms, setAlarms }}>
      {children}
    </AlarmsContext.Provider>
  );
};
