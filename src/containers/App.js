import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';      // {} because the export is not default, there can be more exports
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';

function App() {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		searchfield: ''
	// 	}
	// }
	
	const [robots, setRobots] = useState([]);		// in useState we give the state of the robots in the beginning, which is an empty array
	const [searchfield, setSearchfield] = useState('');		// same thing with the constructor, but with hooks
	const [count, setCount] = useState(0)

	// componentDidMount() {							// lifecycle hook (same as constructor, render etc.)
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then(response => response.json())		// one line means is a return
	// 		.then(users => {this.setState({ robots: users})});
	// }

	useEffect(() => {											// useEffect runs every time the function App runs, same as componentDidMount, componentDidUpdate etc.
		fetch('https://jsonplaceholder.typicode.com/users')				// every time the app renders it will call this function
		.then(response => response.json())		// one line means is a return
		.then(users => {setRobots(users)});
		console.log(count)
	}, [count])	// we need the second parameter, otherwise the function will run in an infinite loop
	// only run useEffect when the app is render (we put an empty array) -> now is like componentDidMount
	// only run when count changes

	const onSearchChange = (event) => {
		// console.log(event.target.value);		// it gives us the value that we type in the input
		// this.setState({ searchfield: event.target.value })			// !!! always
		// console.log(filteredRobots);
		setSearchfield(event.target.value)	// same as line 29 when we had classes
	}

	// const { robots, searchfield } = this.state;	// no longer nedeed
	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	if (!robots.length) {			// if it is 0
		return <h1>Loading</h1>		// OR return !robots.length ? ... : ...
	} else {
		return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<button onClick={()=>setCount(count+1)}>Click Me!</button>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots}/>
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}

export default App;