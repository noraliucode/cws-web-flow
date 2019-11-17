import React, {Component} from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Connect from './pages/Connect';
import store from './store';
import IframeEventHandler from './scripts/iframe'
import WebPageEventHandler from './scripts/webpage'
class App extends Component {
  constructor(props) {
    super(props);
    let bc = new BroadcastChannel('coolwallets')
    new IframeEventHandler(bc)
    let webpageHandler = new WebPageEventHandler(bc)
    this.state = {
      transport: null,
      webpageHandler,
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Container>
          <Connect webpageHandler={this.state.webpageHandler} />
        </Container>
      </Provider>
    )
  }
}

export default App
