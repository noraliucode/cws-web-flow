import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Container from './components/Container'
import Connect from './pages/Connect'
import WebBleTransport from '@coolwallets/transport-web-ble'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transport: null,
      blockOnFirstCall: true,
      bc: new BroadcastChannel('coolwallets')
    }
  }

  connect = () => {
    WebBleTransport.listen(async (error, device) => {
      if (error) throw error
      
      const transport = await WebBleTransport.connect(device);
      this.setState({
        transport,
        blockOnFirstCall: true
      });
      this.state.bc.postMessage({ target: 'connection-success' })
      
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
