import React, {Component} from 'react';
import {Button} from 'antd';

class Home extends Component {
	render(){
		console.log(this.props);
		return (
			<div>
				<h1>Welcome Home</h1>
				<Button type="primary">Je ne sais pas</Button>
				<Button type="danger">Ah oui.</Button>
			</div>
		);
	}
}

export default Home;