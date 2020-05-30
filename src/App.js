import React from 'react';
import HomePage from './pages/homepage/homepage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.styles.scss';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route path='/' exact component={HomePage} />
			</Router>
		);
	}
}
export default App;
