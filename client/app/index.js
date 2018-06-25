import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import App from './components/App'
import NotFound from './NotFound'

import Home from './containers/Home/HomeContainer'
import UserProfile from './pages/UserProfile'
import Signup from './containers/Pages/SignupContainer'
import SignupLanding from './pages/SignupLanding'

import './styles/styles.scss'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore.js'
import { setCurrentUserFromToken } from './actions/UserActions'
import { INITIAL_STATE as userReducerInitialState } from './reducers/UserReducer'



const initialState = {
  UserReducer: userReducerInitialState
};

const store = configureStore(initialState);
loadStore(store);



ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>         
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signuplanding" component={SignupLanding} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));

registerServiceWorker();

/* Todo:
 * 
 * Success failure dispatches on the sign up form
 * Look at the servers jwt auth code and see if it should be refactored like local
 * The servers sign up should probably match the local sign in logic, I was having an issue no being able to break
 *      from then chains so I had to throw and error
 * Should I be encrypting the email or not?
 * Adjust the navbar depending on the JWT token
 * Make a semi-proper footer
 * Im not convinced userpostsreducer should be its own thing... it should be centric around which profile you're looking at
 * 
 */

function loadStore(store) {
  const token = store.getState().UserReducer.authentication.token;
  if (token) {
    store.dispatch(setCurrentUserFromToken(token));
  }
}
