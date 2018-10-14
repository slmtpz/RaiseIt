import React, {Component} from 'react';

import AdMap from './AdMap';
import PostList from './PostList';
import './Home.css'

class Home extends Component {
	render(){
		console.log(this.props);
		return (
			<div className='home-grid'>
				<AdMap
					events={this.props.events}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAdvV5oYS9vTziqOCBJ1oag-ABFsuenhBQ&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `40%` }} />}
					containerElement={<div/>}
					mapElement={<div style={{ height: `40%` }} />}
			    />
				{/* <MeinList /> */}
				<PostList />
			</div>
		);
	}
}

export default Home;