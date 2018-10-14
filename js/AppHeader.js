import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

import requestHandler from './RequestHandler';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
const { Header, Content} = Layout;
const NAVBAR_HEIGHT = '64px';


class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalVisible: false,
      signupModalVisible: false
    }

    this.onSignUpFormOk = this.onSignUpFormOk.bind(this);
    this.onSignUpFormCancel = this.onSignUpFormCancel.bind(this);
    this.onLoginFormOk = this.onLoginFormOk.bind(this); 
    this.onLoginFormCancel = this.onLoginFormCancel.bind(this);
    this.menuClicked = this.menuClicked.bind(this);
  }

  onSignUpFormOk(user) {
    this.props.onUserLogin(user);
    this.setState({ signupModalVisible: false });
  }

  onSignUpFormCancel() { this.setState({signupModalVisible: false}); }

  onLoginFormOk(user) {
    this.props.onUserLogin(user);
    this.setState({ loginModalVisible: false });
  }

  onLoginFormCancel() { this.setState({loginModalVisible: false}); }


  menuClicked({item, key, keyPath}) {
    if (key === 'signup') { this.setState({signupModalVisible: true}) };
    if (key === 'login')  { this.setState({loginModalVisible: true}) };
    if (key === 'logout') { this.props.onUserLogOut() }
  }

  render () {
    let user = this.props.user;
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
            {!user && <Menu.Item style={{float: 'right'}} key='login'>Log In</Menu.Item> }
            {!user && <Menu.Item style={{float: 'right'}} key='signup'>Sign Up</Menu.Item> }
            {user && <Menu.Item style={{float: 'right'}} key='logout'>Log out</Menu.Item> }
            {user && <Menu.Item
              style={{float: 'right'}}
              key='deposit'>Deposit  <Icon type="rise" theme="outlined" />
            </Menu.Item>}
            {user && <Menu.Item
              style={{float: 'right'}}
              key='credit'>
              Current credit: {user.credit} <Icon type="dollar" theme="outlined" />
            </Menu.Item>}
            {user && <Menu.Item style={{float: 'right'}} key='username'>Hello {user.username}</Menu.Item> }
          </Menu>
        </Header>
        
        <SignUpModal
          visible={this.state.signupModalVisible}
          onOk={this.onSignUpFormOk}
          onCancel={this.onSignUpFormCancel}
        />

        <LoginModal
          visible={this.state.loginModalVisible}
          onOk={this.onLoginFormOk}
          onCancel={this.onLoginFormCancel}
        />
      </div>
    );
  }
}
export default AppHeader;
