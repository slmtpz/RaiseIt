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
		this.fetchAndUpdatePosts = this.fetchAndUpdatePosts.bind(this);
		this.onRaiseClicked = this.onRaiseClicked.bind(this);
	}

	fetchAndUpdatePosts() {
		requestHandler.get('/posting').then(e => {
			this.setState({postings: e.data.postings});
		});
	}
	onRaiseClicked(raisedObject) {
		requestHandler.post('/raise',{
			username: localStorage.getItem('username'),
			bid_amount: raisedObject.minimum_bid,
			posting_id: raisedObject._id
		}).then(e => {
			console.log('RAISE SONUCU:', e);
 			this.fetchAndUpdatePosts();
			this.props.updateUser();
		});
	}

	componentDidMount() {
		console.log('HOME. componentDidMount');
		this.fetchAndUpdatePosts();
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
					onRaiseClicked={this.onRaiseClicked}
					data={this.state.postings}
				/>}
				{/* TO DO: ADD LOADER. */}
			</div>
		);
	}
}

export default Home;