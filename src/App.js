import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import {
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
} from 'react-native-dotenv';

export default class App extends Component {

	componentWillMount() {
		firebase.initializeApp({
	    apiKey: API_KEY,
			authDomain: AUTH_DOMAIN,
			databaseURL: DATABASE_URL,
			projectId: PROJECT_ID,
			storageBucket: STORAGE_BUCKET,
			messagingSenderId: MESSAGING_SENDER_ID,
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