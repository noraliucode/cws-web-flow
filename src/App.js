import React from 'react';
import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Connect from './pages/Connect';
import { Provider } from 'react-redux';
import store from './store';
import Register2 from './pages/Register2';
import Modal from './components/Modal';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<Modal />
			<Container>
				<Register2 />
				{/* <Connect /> */}
			</Container>
		</Provider>
	);
}

export default App;
