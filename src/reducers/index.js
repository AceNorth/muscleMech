import { combineReducers } from 'redux';
import AuthReducer from './AuthState';
import RunReducer from './RunState';
// import PieceReducer from './PieceState';
import UserReducer from './UserState';

export default combineReducers({
	auth: AuthReducer,
	runs: RunReducer,
	// pieces: PieceReducer,
	user: UserReducer
});