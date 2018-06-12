import React, { Component } from 'react';
import BottomNav from './BottomNav';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import ProfilePage from './ProfilePage/ProfilePage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import SuccessPage from './SuccessPage/SuccessPage';
import CollectionPage from './CollectionPage/CollectionPage';

class App extends Component {
  state = {
    isLoggedIn: false
  };

  // keeps track globally of the auth status
  trackSignIn() {
    if (localStorage.getItem('jwt-token')) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  trackSignOut() {
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/' exact render={() => <HomePage isLoggedIn={this.state.isLoggedIn} />} />
            <Route path='/profile' exact render={() => <ProfilePage trackSignOut={this.trackSignOut} />} />
            <Route path='/login' exact render={() => <LoginPage trackSignIn={this.trackSignIn} />} />
            <Route path='/register' exact render={() => <SignupPage trackSignIn={this.trackSignIn} />} />
            <Route path='/login/success' exact render={() => <SuccessPage type='login' />} />
            <Route path='/logout/success' exact render={() => <SuccessPage type='logout' />} />
            <Route path='/register/success' exact render={() => <SuccessPage type='register' />} />
            <Route path='/collections/:collectionId' exact render={() => <CollectionPage />} />
            
          </Switch>
          <BottomNav />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
