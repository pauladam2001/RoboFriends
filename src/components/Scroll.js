import React from 'react';

const Scroll = (props) => {
	// return props.children		// children has CardList
	return (							//css: overflow-y, jsx: overflowY   (camelCase in jsx)
		<div style={{overflowY: 'scroll', border: '5px solid grey', height: '700px'}}>		
			{props.children}
		</div>
	);
};

export default Scroll;