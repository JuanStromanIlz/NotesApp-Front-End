import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    black: '#0A0C0B',
    white: '#F2F1F9',
    grey: '#D9DFDC',
    main: '#544BAD',
    light: '#958DCE',
    dark: '#2D3B6E'
  },
  fonts: ['Source Sans Pro']
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;