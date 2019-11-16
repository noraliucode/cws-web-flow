import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Header from './components/Header';
import Modal from './components/Modal';
import Container from './components/Container';
import Connect from './pages/Connect';

function App() {
	return (
		<div>
			<Header />
			<Container>
				<Connect />
			</Container>
		</div>
	);
}

export default App;
