import { createUser } from './UserState';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = { 
	email: '', 
	password: '', 
	user: null, 
	error: '', 
	loading: false 
};

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGIN_USER_START = 'LOGIN_USER_START';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	}
}

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	}
}

export const loginUser = ({ email, password}) => {
	return (dispatch) => {
		
		dispatch({ type: LOGIN_USER_START })

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => {
						loginNewUserSuccess(dispatch, user)})
					.catch(err => {
						console.error(err); 
						loginUserFail(dispatch);
				});
			})

		};
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	Actions.returningUser();
};

const loginNewUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	Actions.newUser();
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return Object.assign({}, state, {email: action.payload})
			//or {..state, email: action.payload } would do the same thing
		case PASSWORD_CHANGED:
			return Object.assign({}, state, {password: action.payload})
		case LOGIN_USER_START:
			return Object.assign({}, state, {loading: true, error: ''})
		case LOGIN_USER_SUCCESS:
			//reset everything to initial state so we're not storing the form data
			return Object.assign({}, state, INITIAL_STATE, { user: action.payload })
		case LOGIN_USER_FAIL:
			return Object.assign({}, state, {error: 'Authentication Failed.', password: '', loading: false})
		default: 
			return state;
	}
}