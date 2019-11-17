import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Connect from './pages/Connect';
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
      <div>
        <Header />
        <Container>
          <Connect webpageHandler={this.state.webpageHandler} />
        </Container>
      </div>
    )
  }
}

export default App
