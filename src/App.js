import React from 'react';
import Main from './main'
import './App.css';
import theme from './ui/theme'
import {ThemeProvider} from '@material-ui/core/styles'
import User from './user'

import Container from '@material-ui/core/Container';
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div >
      <Container  maxWidth="lg">
        <Main/>
       
        </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
