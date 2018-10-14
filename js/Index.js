import React, {Component} from 'react';
import { Layout } from 'antd';

import AppMain from './AppMain';
import AppHeader from './AppHeader';
import requestHandler from './RequestHandler';


class Application extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null }

    this.onUserLogin = this.onUserLogin.bind(this);
    this.onUserLogOut = this.onUserLogOut.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  checkLocalStorage() {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    let credit = localStorage.getItem('credit');
    
    if (username && password && credit)
      return {
        username: username,
        password: password,
        credits: credit
      };
    return null;
  }
  
  setLocalStorage(user) {
    for (let key in user) {
      localStorage.setItem(key, user[key]);
    }
  }

  componentDidMount() {
    let user = this.checkLocalStorage();
    console.log('APPLICATION. componentDidMount:', user);
    
    if (user) {
      this.setState({ user: user });
      requestHandler.post('/login',{
        username: user.username,
        password: user.password
      }).then(res => {
        this.setLocalStorage(res.data);
        this.setState({user: res.data})
      });
    }
  }

  onUserLogOut() {
    localStorage.clear();
    this.setState({user: null});
  }

  onUserLogin(user) {
    console.log('APPLICATION., onUserLogin: user', user);    
    this.setState({user: user});
    this.setLocalStorage(user);
  }

  updateUser() {
    let user = this.checkLocalStorage();
    if (!user)  return;
    requestHandler.post('/login', {
      username: user.username,
      password: user.password
    }).then(response =>{
      this.setState({user: response.data});
      this.setLocalStorage(user);
    });
  }
  render() {
    console.log('APPLICATION., render: state', this.state);
    return (
      <div>
        <Layout>
          <AppHeader
            user={this.state.user}
            onUserLogOut={this.onUserLogOut}
            onUserLogin={this.onUserLogin}
          />
        </Layout>
        <AppMain
          updateUser={this.updateUser}
        />
      </div>
    );
  }
}

export default Application;