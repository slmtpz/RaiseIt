import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

import SignUpModal from './components/SignUpModal';
const { Header, Content} = Layout;
const NAVBAR_HEIGHT = '64px';


class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalVisible: false,
      signupModalVisible: false,
      loggedIn: false
    }

    this.onFormOk = this.onFormOk.bind(this);
    this.onFormCancel = this.onFormCancel.bind(this); 
    this.menuClicked = this.menuClicked.bind(this);
  }

  onFormOk() { this.setState({signupModalVisible: false}); }

  onFormCancel() { this.setState({signupModalVisible: false}); }

  menuClicked({item, key, keyPath}) {
    console.log('item', item);
    console.log('key', key);
    console.log('keyPath', keyPath);
    if (key === 'signup') {console.log('set sign up visible'); this.setState({signupModalVisible: true})};
  }

  render () {
    return (
      <div>
        <Header className="header">
            {/* <div className="logo" /> */}
          <Menu onClick={this.menuClicked}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: NAVBAR_HEIGHT }}
          >
            <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/posts'>Posts</Link></Menu.Item>
            {!this.state.loggedIn && <Menu.Item style={{float: 'right'}} key='login'>Log In</Menu.Item> }
            {!this.state.loggedIn && <Menu.Item style={{float: 'right'}} key='signup'>Sign Up</Menu.Item> }
            {this.state.loggedIn && <Menu.Item style={{float: 'right'}} key='logout'>Log out</Menu.Item> }
          </Menu>
        </Header>
        
        <SignUpModal
          // wrappedComponentRef={this.saveFormRef}
          visible={this.state.signupModalVisible}
          onCancel={this.onFormOk}
          onCreate={this.onFormCancel}
        />
      </div>
    );

  }
}
export default AppHeader;
