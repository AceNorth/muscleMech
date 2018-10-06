import firebase from 'firebase';
import SidequestPacks from '../components/GameLibraries/SidequestPacks';
import expeditions from '../components/GameLibraries/ExpeditionLibrary';

const INITIAL_STATE = {
	initialLoginDate: '',   
	dailyCountdown: 86400,

	lastLoginDate: '', 
	completedMissions: 0, 
	totalPower: 0,
  baseName: 'SOMEBODY GOOFED BIG TIME',
  factions: {},

	mechLevel: 1,
	powerPerDay: 0,
	bonusDamage: 0,
	maxBoost: 5,

	selectedMission: {},
  selectedMissionPieceUID: null,
	sidequestPool: ["RANDOM"],
	availableSidequests: SidequestPacks,
	expeditions,

	userFetched: false,

	// has the player won or lost the current game
	gameOver: false

};

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_MECH = 'UPDATE_MECH';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const ADD_PIECE = 'ADD_PIECE';
export const UPDATE_PIECE = 'UPDATE_PIECE';
export const SELECT_MISSION = 'SELECT_MISSION';
export const REMOVE_PIECE = 'REMOVE_PIECE';

export const createUser = (initialLoginDate, townName) => {
	let newUser = Object.assign({}, INITIAL_STATE, {
		initialLoginDate,
		baseName: townName,
		lastLoginDate: initialLoginDate
	});
	const { currentUser } = firebase.auth();
	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}`)
		.set( newUser )
		.then(() => {
			dispatch(fetchUser())
		});
	};
};

export const updateUser = ( updateObject ) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}`)
		.update( updateObject )
		.then(() => {
			dispatch({ type: UPDATE_USER, payload: updateObject });
		});
	};
};

export const fetchUser = () => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}`)
			.on('value', snapshot => {
				dispatch({ type: FETCH_USER_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const setFactions = ( baseObj ) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/factions`)
			.set( baseObj )
			.then(() => {
				dispatch(fetchUser())
			});
	};
};

export const updateFaction = (factionKey, updateObject) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/factions/${factionKey}`)
			.update( updateObject )
			.then(() => {
				dispatch(fetchUser())
			});
	};
}

export const addPiece = ( piece ) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		// set the key on the piece itself when it's created
		let pieceKey = firebase.database().ref(`/users/${currentUser.uid}/pieces`)
			.push( piece ).key;
		piece.uid = pieceKey;
		firebase.database().ref(`/users/${currentUser.uid}/pieces/${pieceKey}`)
      .update(piece)
      .then(() => {
				dispatch(fetchUser())
			});
	};
};

export const updatePiece = ( updateObject ) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pieces/${updateObject.uid}`)
      .update(updateObject)
      .then(() => {
				dispatch(fetchUser())
			});
  };
};

export const selectMission = ( mission, pieceUID, index ) => {
	return (dispatch) => {
		dispatch({ type: SELECT_MISSION, mission, pieceUID, index });
	}
}

export const removePiece = ({ uid }) => {
  const { currentUser } = firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/pieces/${uid}`)
      .remove()
      .then(() => {
				dispatch(fetchUser())
			});
  };
};

export default (state = INITIAL_STATE, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case UPDATE_USER:
			return Object.assign({}, newState, action.payload);
		case UPDATE_MECH:
			newState.currentMech = Object.assign({}, newState.currentMech, action.payload)
			return newState;
		case FETCH_USER_SUCCESS:
			newState.userFetched = true;
			return Object.assign({}, newState, action.payload);
		case SELECT_MISSION:
			return { ...state,
				selectedMission: action.mission,
				selectedMissionPieceUID: action.pieceUID,
				selectedMissionEncounterIndex: action.index
			};
		default:
			return state;
	}
};