import React from 'react';
import './App.css';
import Header from './components/Header';
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
