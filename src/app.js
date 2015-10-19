// import Backbone from 'backbone';
// import $ from 'jquery';
// import LoginView from 'views/login';
// import MainView from 'views/main';
// import AddTripView from 'views/addtrip';
// import EditTripView from 'views/edittrip';
// import NextMonthView from 'views/nextmonth';
// import UsersView from 'views/users';
// import AddUserView from 'views/adduser';
// import EditUserView from 'views/edituser';
// import { beforeSend, logout } from 'models/account';
// import Trips from 'collections/trips';
// import Users from 'collections/users';

// import React from 'react';
// import {render} from 'react-dom';
// import {Router, Route, Link} from 'react-router';
// import Login from 'components/login';

import {createStore as createStore_, applyMiddleware} from 'redux';
import promiseMiddleware from 'stores/promise-middleware';
import reducer from 'modules/auth';
import {login} from 'modules/auth';

function createStore(reducer) {
  return applyMiddleware(promiseMiddleware)(createStore_)(reducer);
}

const store = createStore();

store.dispatch(login('admin', 'dmin'));
console.log(store.getState());

// import Auth from 'auth';

// Auth.login('admin', 'dmin')
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));


// let Router = Backbone.Router.extend({
//   routes: {
//     '': 'redirect',
//     'login': 'login',

//     'trips/add': 'addTrip',
//     'trips/edit/:id': 'editTrip',
//     'trips/delete/:id': 'deleteTrip',
//     'trips/next-month': 'nextMonth',
//     'trips': 'main',

//     'users/add': 'addUser',
//     'users/edit/:id': 'editUser',
//     'users/delete/:id': 'deleteUser',
//     'users': 'users',

//     'logout': 'handleLogout',
//   },

//   initialize() {
//     this.trips = new Trips();
//     this.users = new Users();
//   },

//   switchView(view) {
//     if (this.view) {
//       this.view.stopListening();
//     }
//     this.view = view;
//     this.view.render();
//   },

//   redirect() {
//     this.navigate('#trips');
//   },

//   login() {
//     ReactDOM.render(
//       <Login />,
//       document.getElementById('content')
//     );
//   },

//   addTrip() {
//     this.switchView(new AddTripView({collection: this.trips, router: this}));
//   },

//   editTrip(tripId) {
//     let model = this.trips.findWhere({id: parseInt(tripId, 10)});
//     this.switchView(new EditTripView({model: model, router: this}));
//   },

//   deleteTrip(tripId) {
//     let model = this.trips.findWhere({id: parseInt(tripId, 10)});

//     model.destroy();
//     this.navigate('#', {trigger: true});
//   },

//   nextMonth() {
//     this.switchView(new NextMonthView({router: this}));
//   },

//   main() {
//     this.switchView(new MainView({
//       collection: this.trips,
//       router: this,
//       users: this.users,
//     }));

//   },

//   users() {
//     this.switchView(new UsersView({collection: this.users, router: this}));
//   },

//   deleteUser(userId) {
//     let model = this.users.findWhere({id: parseInt(userId, 10)});

//     model.destroy();
//     this.navigate('#', {trigger: true});
//   },

//   addUser() {
//     this.switchView(new AddUserView({collection: this.users, router: this}));
//   },

//   editUser(userId) {
//     let model = this.users.findWhere({id: parseInt(userId, 10)});
//     this.switchView(new EditUserView({model: model, router: this}));
//   },

//   handleLogout() {
//     logout();
//   },
// });

// $(() => {
//   let router = new Router();

  // $.ajaxSetup({
  //   statusCode: {
  //     401: () => { Backbone.history.navigate('#login', {trigger: true}); }
  //   },
  //   beforeSend: beforeSend,
  // });
// window.onload = () => {
//   ReactDOM.render(
//     <Login />,
//     document.getElementById('content')
//   );
//   // Backbone.history.start();
// };
// });

// function requireAuth(nextState, replaceState) {
//   if (!auth.loggedIn()) {
//     replaceState({nextPathname: nextState.location.pathname}, '/login');
//   }
// }



// render((
//   <Router history={history}>
//     <Route path="/" component={App}>
//       <Route path="login" component={Login}/>
//       <Route path="logout" component={Login}/>
//       <Route path="trips" component={Trips} onEnter={requireAuth}/>
//       <Route path="users" component={Users} onEnter={requireAuth}/>
//     </Route>
//   </Router>
// ), document.getElementById('content'));

