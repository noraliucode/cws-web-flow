import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
// import Button from './components/Button'
import Header from './components/Header'
// import Modal from './components/Modal'
import Container from './components/Container'
import Connect from './pages/Connect'

import CoolWalletSBridge from './scripts/listeners'

class App extends Component {

  render() {
    const bridge = new CoolWalletSBridge()
    return (
      <div>
        <Header />
        <Container>
          <Connect bridge={bridge} />
        </Container>
      </div>
    )
  }
}

export default App
