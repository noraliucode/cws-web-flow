import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Connect from './pages/Connect';
import store from './store';
import Register2 from './pages/Register2';
import IframeScript from './scripts/iframeScript'
import Modal from './components/Modal';
import GenerateWallet from './pages/GenerateWallet';

function App() {
	return (
		<Router>
			<Switch>
				<Provider store={store}>
					<Header />
					<Modal />
					<Container>
						<Route exact path="/" component={Connect} />
						<Route path="/register2" component={Register2} />
						<Route path="/iframe" component={IframeScript} />
						<Route path="/generateWallet" component={GenerateWallet} />
					</Container>
				</Provider>
			</Switch>
		</Router>
	);
}

export default App;
