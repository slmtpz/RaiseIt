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
			let postings = e.data.postings
			let username = localStorage.getItem('username');

			console.log('HOME. initial posts', postings.length);
			console.log('username', username)
			console.log('display type', this.props.displayMode);
			if (this.props.displayMode === 'myposts') {
				postings = postings.filter((e) => e.username === username);
			}

			if (this.props.displayMode === 'allposts' && username) {
				postings = postings.filter((e) => e.username !== username);
			}
			console.log('HOME. final posts', postings.length);

			this.setState({postings: postings});
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
				{/* <AdMap
					events={this.props.events}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAdvV5oYS9vTziqOCBJ1oag-ABFsuenhBQ&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{height: `400px`}}/>}
					mapElement={<div style={{ height: `100%` }} />}
			    /> */}
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