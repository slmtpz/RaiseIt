import React, {Component} from 'react';

import AdMap from './AdMap';
import TableWrap from './TableWrap';
import requestHandler from './../RequestHandler';
import './Home.css'

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			postings: [],
		}
	}

	componentDidMount() {
		requestHandler.get('/posting').then(e => {
			// console.log(e.data.postings);
			this.setState({postings: e.data.postings});
		});
		// console.log(localStorage.getItem('username'));
		// localStorage.setItem('username', 'naber');
		// localStorage.clear();
	}


	render(){
		return (
			<div style={{margin: "0px 15% 0px"}}>
				<AdMap
					events={this.props.events}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAdvV5oYS9vTziqOCBJ1oag-ABFsuenhBQ&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{height: `400px`}}/>}
					mapElement={<div style={{ height: `100%` }} />}
			    />
				{this.state.postings.length > 0 &&
				<TableWrap
					data={this.state.postings}
				/>}
				{/* TO DO: ADD LOADER. */}
			</div>
		);
	}
}

export default Home;