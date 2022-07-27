import { createTheme, Theme } from '@mui/material';

export const REACT_APP_GOOGLE_MAPS_API_KEY = 'AIzaSyB5beAxmHoP94-ntQ77YjZgYUa8Tpl9I3E' as string;
export const MAP_CENTER = { lat: 31.472115938822, lng: 74.25008865725727 };

export enum plantTreeActionKind {
  PLANT = 'PLANT',
  REMOVE = 'REMOVE',
  INITIALIZE = 'INITIALIZE',
}

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
  },
});
