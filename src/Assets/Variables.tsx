import { createTheme, Theme, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const REACT_APP_GOOGLE_MAPS_API_KEY = 'AIzaSyB5beAxmHoP94-ntQ77YjZgYUa8Tpl9I3E' as string;
export const MAP_CENTER = { lat: 31.472115938822, lng: 74.25008865725727 };

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
