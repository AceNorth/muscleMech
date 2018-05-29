import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, Text } from 'react-native';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
} from 'react-native-dotenv';

export default class App extends Component {

	componentWillMount() {
		firebase.initializeApp({
	    apiKey,
			authDomain,
			databaseURL,
			projectId,
			storageBucket,
			messagingSenderId,
	  })
	}

	render(){
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<Router />
			</Provider>
		);
	}
}