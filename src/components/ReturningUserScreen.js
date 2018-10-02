import React, {Component} from 'react';
import { Text, View, ImageBackground, ScrollView, Modal } from 'react-native';
import { CardSection } from './common/CardSection';
import { connect } from 'react-redux';
import { 
	fetchUser, 
	updateUser,
	updatePiece,
	addPiece
} from '../reducers/UserState';
import {
  generateBase,
  generateAttack,
  generateDiplomacy,
  buildBoss
} from './Utilities/Generators';
import * as FactionLibrary from './GameLibraries/FactionLibrary';
import FactionBuildings from './GameLibraries/FactionBuildings';
import Sidequests from './GameLibraries/SidequestLibrary';
import { fetchRuns } from '../reducers/RunState';
import { ConfirmationModal } from './ConfirmationModal';
import { Actions } from 'react-native-router-flux';
import { generateRandomMission } from './Utilities/RandomMissionGenerator';

const updateMessages = ["HERE'S WHAT HAPPENED IN YOUR ABSENCE: "];

class ReturningUserScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			updated: false,
			user: {},
			showWelcomeBackModal: true,
			secondsSinceLastLogin: 0,
		}
	}

	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchRuns();
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.user.lastLoginDate && !this.state.updated) {
			let user = nextProps.user;
      if (user.gameOver) {
        updateMessages.push("This game is complete! But you can keep playing for fun if you like!")
      }
			let secondsSinceLastLogin = this.getSecondsSinceLastLogin(user);

			this.updateLastLoginDate(user);
			this.updateUserCountdown(user, secondsSinceLastLogin);
			this.updatePieceCountdowns(user, secondsSinceLastLogin);
			this.props.updateUser(user);

  		// apply all updated info to the local state
  		this.setState({ 
  			user,
  			secondsSinceLastLogin,
  			updated: true,
  		});
  	}
	}

	triggerEvent(user) {
    const wheelOfPossiblities = Object.keys(user.factions).concat(['SIDEQUEST']);

    // spin the WHEEL OF POSSIBILITIES
    const result = wheelOfPossiblities[Math.floor(Math.random() * wheelOfPossiblities.length)];

    if (result === 'SIDEQUEST') {
      this.addSidequest(user);
    } else {
      const selectedFaction = user.factions[result];
      this.triggerFactionAction(user, selectedFaction);
    }
	}

  triggerFactionAction(user, factionObj) {
    const triggeredEvent = factionObj.possibleActions[Math.floor(Math.random() * factionObj.possibleActions.length)];

    switch (triggeredEvent) {
      case 'ATTACK':

        // if faction has more than 2500 Military Points, they start building their boss monster
        let randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber === 6) {
          let newPiece = buildBoss(factionObj.factionKey);
          const bossBuilderUid = 'bossBuilder' + Math.floor(Math.random() * 10000);
          newPiece.uid = bossBuilderUid;
          user.pieces[bossBuilderUid] = newPiece;
          updateMessages.push(factionObj.displayName + ' is working on something big!');
          return;
        }

        // pick a target based on diplomacy
        let target;
        let lowestDiplomacy = 100;
        Object.keys(factionObj.diplomacy).forEach(factionKey => {
          if (factionObj.factionKey === factionKey) return;
          if (factionObj.diplomacy[factionKey] <= lowestDiplomacy) {
            target = factionKey;
            lowestDiplomacy = factionObj.diplomacy[factionKey];
          }
        })

        // make the defender like the attacker less
        user.factions[target].diplomacy[factionObj.factionKey] -= 10;

        // generate and add the piece
        let newAttack = generateAttack(factionObj.factionKey, target, factionObj.attackLevel, user.factions[target].defenseLevel);
        const attackUid = 'attack' + Math.floor(Math.random() * 10000);
        newAttack.uid = attackUid;
        user.pieces[attackUid] = newAttack;

        // push an update message
        updateMessages.push(factionObj.displayName + ' launches an attack on ' + user.factions[target].displayName + '!');
        return;
      case 'BUILD':
        const builtBuildingIndex = factionObj.availableBuildings[Math.floor(Math.random() * factionObj.availableBuildings.length)]
        const buildingKey = factionObj.availableBuildings.splice(builtBuildingIndex, 1)[0];
        let buildingPiece = FactionBuildings[factionObj.factionKey][buildingKey];
        const buildUid = 'building' + Math.floor(Math.random() * 10000);
        buildingPiece.uid = buildUid;
        user.pieces[buildUid] = buildingPiece;
        updateMessages.push(factionObj.displayName + ' starts building something!');
        return;
      case 'DIPLOMACY':
        let targetIndex = Math.floor(Math.random() * Object.keys(user.factions).length);
        let targetKey = Object.keys(user.factions)[targetIndex];
        // what do we do if they're the same?
        // how about everybody likes that faction better
        if (targetKey === factionObj.factionKey) {
          Object.keys(user.factions).forEach(key => user.factions[key].diplomacy[factionObj.factionKey] += 10);
          updateMessages.push(factionObj.displayName + ' have made a diplomatic breakthrough! Everyone likes them better now.');
        } else {
          let newDiplomacy = generateDiplomacy(factionObj.factionKey, targetKey);
          const diplomacyUID = 'diplomacy' + Math.floor(Math.random() * 10000);
          newDiplomacy.uid = diplomacyUID;
          user.pieces[diplomacyUID] = newDiplomacy;
          updateMessages.push(factionObj.displayName + ' and ' + user.factions[targetKey].displayName + ' are engaging in diplomacy!');  
        }
        return;
      default:
        updateMessages.push('There was an error in triggerFactionAction!');
        return;
    }
  }

  addSidequest(user) {
    const entryIndex = Math.floor(Math.random() * user.sidequestPool.length);
    let newSidequest;
    if (entryIndex === 0) {
        newSidequest = generateRandomMission(user.mechLevel);
    } else {
      let newSidequestPool = user.sidequestPool;
      newSidequest = Sidequests[newSidequestPool.splice(entryIndex, 1)];
      this.props.updateUser({sidequestPool: newSidequestPool})
    }
    updateMessages.push(newSidequest.title);
    const newSidequestUid = 'sidequest' + Math.floor(Math.random() * 10000);
    newSidequest.uid = newSidequestUid;
    user.pieces[newSidequestUid] = newSidequest;
  }

	getSecondsSinceLastLogin(user) {
		// take time since last login and convert it to seconds
	    let seconds = Math.floor(((Date.now() - user.lastLoginDate) / 1000));
	    return seconds;
	}

	updateLastLoginDate(user) {
		let newLogin = Date.now();
		user.lastLoginDate = newLogin;
	}

	updateUserCountdown(user, seconds) {
		user.dailyCountdown -= seconds;
		while (user.dailyCountdown <= 0) {
			this.triggerEvent(user);
      user.totalPower += user.powerPerDay;
			user.dailyCountdown += 86400;
		}
	}

	updatePieceCountdowns(user, seconds) {
		let pieceObj = user.pieces;
    for (let pieceUUID in pieceObj) {
    	let currentPiece = pieceObj[pieceUUID];
  		currentPiece.currentCountdown -= seconds;
			while (currentPiece.currentCountdown < 0) {
        currentPiece.countdownActions.forEach(action => {
          this.resolveCountdownActions(currentPiece, user, action);
        })
  			currentPiece.currentCountdown += currentPiece.maxCountdown;
	  	}
    }
	}

	// updateFactionCountdowns(user, seconds) {
	// 	let factionBases = user.factions;
 //    for (let key in factionBases) {
 //    	let currentBase = factionBases[key];
 //  		currentBase.currentCountdown -= seconds;
	// 		while (currentBase.currentCountdown < 0) {
 //  			currentBase.countdownActions.forEach(action => {
 //          this.resolveCountdownActions(currentBase, user, action);
 //        })
 //  			currentBase.currentCountdown += currentBase.maxCountdown;
	//   	}
 //    }
	// }

  eliminateFaction(user, deadFactionKey) {
    if (deadFactionKey === 'Player') {
      user.gameOver = true;
      updateMessages.push(user.baseName + ' has been overrun! You lose!')
    } else {
      Object.keys(user.factions).forEach(factionKey => {
        if (factionKey === deadFactionKey) {
          updateMessages.push(user.factions[factionKey].displayName + ' has been eliminated!');
          delete user.factions[deadFactionKey];
        } else {
          delete user.factions[factionKey].diplomacy[deadFactionKey];
        }
      })
      if (Object.keys(user.factions).length === 1) {
        user.gameOver = true;
        updateMessages.push('All other factions have been eliminated! You win I guess, you monster')
      }
    }
  }

	resolveCountdownActions(piece, user, action) {
		switch (action.type) {
			case "STEAL_POWER":
				user.totalPower = user.totalPower - action.payload;
				if (user.totalPower < 0) user.totalPower = 0;
				updateMessages.push(action.message);
				return;
      case "GAIN_POWER":
        user.totalPower += action.payload;
        updateMessages.push(action.message);
        return;
      case 'ATTACK_RANDOM_OPPONENT':
        const targetKey = Object.keys(user.factions)[Math.floor(Math.random() * Object.keys(user.factions).length)];
        if (targetKey === piece.factionKey) {
          updateMessages.push('King Turtle Berserker roars!!!')
          return;
        }
        const targetObj = user.factions[targetKey];
        targetObj.HP -= action.payload;
        updateMessages.push(action.message);
        updateMessages.push(targetObj.displayName + ' takes ' + action.payload + ' damage!');
        if (user.factions[targetObj].HP <= 0) {
          this.eliminateFaction(user, targetKey);
          updateMessages.push(targetObj.displayName + ' is destroyed!!!');
        }
        return;
      case 'ATTACK_MOST_HATED_OPPONENT':
        let targetKey2;
        let lowestDiplomacy = 1000;
        let potentialTargets = Object.keys(user.factions[piece.factionKey].diplomacy);
        potentialTargets.forEach(factionKey => {
          if (factionKey === piece.factionKey) return;
          if (user.factions[piece.factionKey].diplomacy[factionKey] <= lowestDiplomacy) {
            targetKey2 = factionKey;
            lowestDiplomacy = potentialTargets[factionKey];
          }
        });
        const targetObj2 = user.factions[targetKey2];
        targetObj2.HP -= action.payload;
        updateMessages.push(action.message);
        updateMessages.push(targetObj2.displayName + ' takes ' + action.payload + ' damage!');
        if (user.factions[targetObj2].HP <= 0) {
          this.eliminateFaction(user, targetKey2);
          updateMessages.push(targetObj2.displayName + ' is destroyed!!!');
        }
        return;
			case "DISAPPEAR":
				updateMessages.push(action.message);
				delete user.pieces[piece.uid];
				return;
			case "SPAWN_NEW_PIECE":
				updateMessages.push(action.message);
        const newPieceUid = 'mission' + Math.floor(Math.random() * 10000);
        let newPiece = action.payload;
        newPiece.uid = newPieceUid;
        user.pieces[newPieceUid] = newPiece;
				return;
			// case "GAIN_MILITARY_POINTS":
			// 	piece.currentMilitaryPoints += piece.militaryPointsPerDay;	
			// 	piece.militaryPointsPerDay += piece.growthRate;
			// 	piece.countdownActions.push({
			// 		type: "GAIN_MILITARY_POINTS",
			// 		payload: '',
			// 		message: ''
			// 	});
			// 	return;
      // case 'TRANSFER_MILITARY_POINTS':
      //   // the winner gains MP equal to their attack's strength * 100
      //   // the loser loses that many points, less their defense level * 100
        // const loser = user.factions[action.loserKey].currentMilitaryPoints;
      //   const MPlost = action.payload - (loser.defenseLevel * 100);
      //   if (MPlost < 0) MPlost = 0;

      //   user.factions[action.loserKey].currentMilitaryPoints -= action.payload;
      //   if (user.factions[action.loserKey].currentMilitaryPoints <= 0) {
      //     this.eliminateFaction(user, action.loserKey);
      //   }

      //   user.factions[action.winnerKey].currentMilitaryPoints += action.payload;
      //   updateMessages.push(action.message);
      //   return;
      case 'DAMAGE_TARGET':
        const loser = user.factions[action.loserKey];
        const winner = user.factions[action.winnerKey]
        const damage = winner.attackLevel - loser.defenseLevel;
        if (damage < 0) damage = 0;
        loser.HP -= damage;
        updateMessages.push(action.message);
        if (user.factions[action.loserKey].HP <= 0) {
          this.eliminateFaction(user, action.loserKey);
          updateMessages.push(loser.displayName + ' is destroyed!!!');
        }
        return;
      case 'FACTION_HP_DOWN':
        const target = user.factions[action.targetKey];
        target.HP -= action.payload;
        updateMessages.push(action.message);
        if (user.factions[action.loserKey].HP <= 0) {
          this.eliminateFaction(user, action.loserKey);
          updateMessages.push(loser.displayName + ' is destroyed!!!');
        }
        return;
			case "ADD_SIDEQUEST_TO_POOL":
  			user.sidequestPool.push(action.payload);
  			updateMessages.push(action.message);
  			return;
      case 'FACTION_ATTITUDE_UP':
        user.factions[action.factionDoingTheLiking].diplomacy[action.factionLiked] += action.amount;
        updateMessages.push(action.message);
        return;
      case 'FACTION_ATTITUDE_DOWN':
        user.factions[action.factionDoingTheHating].diplomacy[action.factionHated] -= action.amount;
        updateMessages.push(action.message);
        return;
      case 'UNLOCK_NEW_BUILDING':
        user.factions[piece.factionKey].availableBuildings.push(action.buildingKey);
        updateMessages.push(action.message);
        return;
      case 'ATTACK_UP':
        user.factions[piece.factionKey].attackLevel += action.payload;
        updateMessages.push(action.message);
        return;
      case 'HP_UP':
        user.factions[piece.factionKey].HP += action.payload;
        updateMessages.push(action.message);
        return;
      case 'DEFENSE_UP':
        user.factions[piece.factionKey].defenseLevel += action.payload;
        updateMessages.push(action.message);
        return;
      // case 'MILITARY_POINT_BOOST':
      //   user.factions[piece.factionKey].currentMilitaryPoints += action.payload;
      //   updateMessages.push(action.message);
      //   return;
      // case 'MILTARY_POINTS_PER_DAY_UP':
      //   user.factions[piece.factionKey].militaryPointsPerDay += action.payload;
      //   updateMessages.push(action.message);
      //   return;
      // case 'GROWTH_RATE_UP':
      //   user.factions[piece.factionKey].militaryPointsPerDay += action.payload;
      //   updateMessages.push(action.message);
      //   return;
      case 'CONSTRUCT_BUILDING':
        user.factions[piece.factionKey].buildingsConstructed[action.buildingKey] = true;
        updateMessages.push(action.message);
        return;
      case 'MAKE_ACTION_MORE_LIKELY':
        user.factions[piece.factionKey].possibleActions.push(action.payload);
        updateMessages.push(action.message);
        return;
      case 'NOTHING':
        return;
			default:
				updateMessages.push(piece.title + " doesn't do anything! This was probably not supposed to happen.");
				return;
		}
	}

	onAccept() {
		Actions.main({type: 'reset'});
	}

	printUpdateMessages() {
		if (updateMessages.length > 1) {
			return <Text>{updateMessages.join('\n')}</Text>
		}
	}

	render() {
		return (
			<ImageBackground source={require('../images/background.png')} style={styles.container}>
				<View>
					<ConfirmationModal
						visible={this.state.showWelcomeBackModal}
						onAccept={this.onAccept.bind(this)}
						buttonText={"HELLO"}
		        	>
		        <ScrollView style={{maxHeight: 400}}>
		        	<Text style={{fontWeight: 'bold'}}>WELCOME BACK, CAPTAIN!</Text>
		        	{this.printUpdateMessages()}
		        </ScrollView>
			    </ConfirmationModal>

				</View>
			</ImageBackground>
		)
	}
}

const styles = {
	container: {
	    flex: 1,
	    // remove width and height to override fixed static size
	    width: null,
	    height: null,
	  },
	cardSectionStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
}

const mapStateToProps = state => {
  const user = state.user;
  return { user };
};

export default connect(mapStateToProps, { addPiece, updatePiece, fetchUser, updateUser, fetchRuns })(ReturningUserScreen);