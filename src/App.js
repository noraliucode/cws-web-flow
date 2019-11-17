import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Connect from './pages/Connect';
import WebBleTransport from '@coolwallets/transport-web-ble'
import IframeEventHandler from './scripts/iframe'
import WebPageEventHandler from './scripts/webpage'
class App extends Component {
  constructor(props) {
    super(props);
    this.bc = new BroadcastChannel('coolwallets')
    this.iframeHandler = new IframeEventHandler(this.bc)
    this.webpageHandler = new WebPageEventHandler(this.bc)

    this.state = {
      transport: null,
    }
  }

  connect = () => {
    WebBleTransport.listen(async (error, device) => {
      if (error) throw error
      
      const transport = await WebBleTransport.connect(device);
      this.setState({
        transport
      })
      this.bc.postMessage({ target: 'connection-success' })
    });
  }
  
  render() {
    
    return (
      <div>
        <Header />
        <Container>
          <Connect connect={this.connect} />
        </Container>
      </div>
    )
  }
}

export default App
