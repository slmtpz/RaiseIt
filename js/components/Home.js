import React, {Component} from 'react';
import {Button} from 'antd';

import AdMap from './AdMap';

class Home extends Component {
	render(){
		console.log(this.props);
		return (
			<div>
				<h1>Welcome Home</h1>

				<AdMap
					events={this.props.events}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAdvV5oYS9vTziqOCBJ1oag-ABFsuenhBQ&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div className='event-map' />}
					mapElement={<div style={{ height: `100%` }} />}
			    />

			</div>
		);
	}
}

export default Home;