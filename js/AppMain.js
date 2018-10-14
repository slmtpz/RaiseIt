import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';

import Home from './components/Home';
import Posts from './components/Posts';

class AppMain extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path='/'
            render = {() => 
              (<Home 
                updateUser={this.props.updateUser}
                displayMode={"allposts"}
              />)
            }
          />
          <Route exact path='/posts' 
            render = {() => 
              (<Home 
                updateUser={this.props.updateUser}
                displayMode={"myposts"}
              />)
            }
          />
        </Switch>
      </main>
    );
  }
}

export default AppMain;