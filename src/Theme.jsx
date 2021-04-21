import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    black: '#090a0bff',
    grape: '#a288a6ff',
    lila: '#bb9bb0ff',
    alPink: '#ccbcbcff',
    lavanda: '#f1e3e4ff'
  },
  fonts: ['Source Sans Pro'],
  input: {
    background: '#f1e3e4ff',
    focusBorder: '#bb9bb0ff',
    border: '1px solid #f1e3e4ff'
  },
  button: {
    background: '#ccbcbcff',
    focusBackground: '#a288a6ff',
    borderRadius: '50px',
    padding: '.5em'
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;