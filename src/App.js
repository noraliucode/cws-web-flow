import React, {Component} from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Connect from './pages/Connect';
import store from './store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Container>
          <Connect/>
        </Container>
      </Provider>
    )
  }
}

export default App
