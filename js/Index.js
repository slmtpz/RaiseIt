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
    // this.setLocalStorage = this.setLocalStorage.bind(this);
    // this.checkLocalStorage = this.checkLocalStorage.bind(this);
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
      console.log('setliyoruz:', key, '->', user[key]);
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
    this.setState({user: user});
    this.setLocalStorage(user);
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
        <AppMain />
      </div>
    );
  }
}

export default Application;