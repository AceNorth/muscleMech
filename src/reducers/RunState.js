import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

const INITIAL_STATE = {
	date: '',
	duration: '',
	distance: 0,
	pace: 0,
	runs: null
};

export const LOG_RUN = 'LOG_RUN';
export const FETCH_RUNS_SUCCESS = 'FETCH_RUNS_SUCCESS';

export const logRun = ( date, duration, distance, pace ) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/runs`)
		.push( {date, duration, distance, pace} )
	};
};

export const fetchRuns = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/runs`)
			.on('value', snapshot => {
				dispatch({ type: FETCH_RUNS_SUCCESS, payload: snapshot.val() });
			});
	};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_RUNS_SUCCESS:
			return {...state, runs: action.payload};
		default:
			return state;
	}
};