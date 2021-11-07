import React, { Component } from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';      // {} because the export is not default, there can be more exports
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {							// lifecycle hook (same as constructor, render etc.)
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())		// one line means is a return
			.then(users => {this.setState({ robots: users})});
	}

	onSearchChange = (event) => {
		// console.log(event.target.value);		// it gives us the value that we type in the input
		this.setState({ searchfield: event.target.value })			// !!! always
		// console.log(filteredRobots);
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		if (!robots.length) {			// if it is 0
			return <h1>Loading</h1>		// OR return !robots.length ? ... : ...
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}
		
	}
}

export default App;