import {CssBaseline, Container, Paper, ThemeProvider, createMuiTheme} from '@material-ui/core';

import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ChooseScreen from './screens/ChooseScreen';
import OrderScreen from './screens/OrderScreen';
import ReviewScreen from './screens/ReviewScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';
import PaymentScreen from './screens/PaymentScreen';
import CompleteOrderScreen from './screens/CompleteOrderScreen'


const theme = createMuiTheme({
  typography: {
    h1: {fontWeight: 'bold'},
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white'
    },
  },
  palette: {
    primary: { 
      main: '#d52027'
    },
    secondary: {
      main: '#ffb049',
      dark: '#ffa000',
      contrastText:'#1e4558'
    }
  }
})

function App() {
 

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
          <Container maxWidth="sm">
            <Paper>
              <Route path="/" component={HomeScreen} exact={true} />
              <Route path="/choose" component={ChooseScreen} exact={true} />
              <Route path="/order" component={OrderScreen} exact={true} />
              <Route path="/review" component={ReviewScreen} exact={true} />
              <Route path="/select-payment" component={SelectPaymentScreen} exact={true} />
              <Route path="/payment" component={PaymentScreen} exact={true} />
              <Route path="/complete" component={CompleteOrderScreen} exact={true} />
            </Paper>
          </Container>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
