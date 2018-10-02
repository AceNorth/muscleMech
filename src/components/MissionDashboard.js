import React, {Component} from 'react';
import {
	Text,
	View,
	KeyboardAvoidingView,
	ImageBackground,
	Switch,
	ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Input, CardSection } from './common/index';
import { logRun } from '../reducers/RunState';
import { fetchUser, updateUser, updateMech, removePiece, addPiece } from '../reducers/UserState';
import { ConfirmationModal } from './ConfirmationModal';
import { Actions } from 'react-native-router-flux';
import { convertSecondsToPaceString } from './Utilities/Utilities';
import moment from 'moment';

import ProgressBar from 'react-native-progress/Bar';
import BackgroundGeolocation from "react-native-background-geolocation";
global.BackgroundGeolocation = BackgroundGeolocation;

// import Sound from 'react-native-sound';
// Sound.setCategory('Playback');

// let battleSounds = new Sound('battleSounds.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   } 
//   // loaded successfully
//   console.log('duration in seconds: ' + battleSounds.getDuration() + 'number of channels: ' + battleSounds.getNumberOfChannels());
// });

let missionUpdates = [];
let missionCompleteMessages = [];

class MissionDashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showLoseModal: false,
			showWinModal: false,
			confirmationModalVisible: false,
			missionComplete: false,
			seconds: 0,
			minutes: 0,
			hours: 0,
			distance: 0,
      
      // tempDistance counts up to give the user points every quarter mile
      tempDistance: 0,
			timerOn: false,

			// user stuff
			totalPowerGenerated: 0,
			currentPPM: this.props.user.mechLevel,
			currentDamageTier: 1,
			boostCounter: 0,

			localUser: this.props.user,
			localMission: this.props.user.selectedMission,
			currentCoordinates: null,
			previousCoordinates: [],

			// for treadmill mode
			treadmillModeOn: false,
			userSetPace: "0.0"
		}
		
		this.toggleTimer = this.toggleTimer.bind(this);
		this.onLocation = this.onLocation.bind(this);
		this.onError = this.onError.bind(this);
		this.onMotionChange = this.onMotionChange.bind(this);
		this.onActivityChange = this.onActivityChange.bind(this);
		this.onProviderChange = this.onProviderChange.bind(this);
		this.calculateSecondsPerMile = this.calculateSecondsPerMile.bind(this);
	}

	componentWillMount() {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', this.onActivityChange);

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', this.onProviderChange);

    // BackgroundGeolocation.on('heartbeat', this.onHeartbeat);

    // 2.  #configure the plugin (just once for life-time of app)
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: true, // stop when app closes
      startOnBoot: false, // start when device turns on
      preventSuspend: true,
      // heartbeatInterval: 1
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }

  onError(error) {
    let type = error.type;
    let code = error.code;
    alert(type + " Error: " + code);
  }
  onActivityChange(activityName) {
    console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('- Location provider changed: ', provider.enabled);    
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }
  onLocation(location) {
  	if (!this.state.currentCoordinates) {
  		let currentCoordinates = {x: location.coords.latitude, y: location.coords.longitude};
  		this.setState({currentCoordinates});
  	}

		else if (this.state.currentCoordinates && 
			this.state.timerOn && 
			!this.state.treadmillModeOn) {
      let newCoordinates = {
        	x: location.coords.latitude,
        	y: location.coords.longitude
        };
      let distanceTraveled = this.calculateDistanceTraveled(this.state.currentCoordinates.x, this.state.currentCoordinates.y, newCoordinates.x, newCoordinates.y);
      let newDistance = Number((this.state.distance + distanceTraveled).toFixed(3));
      let newPreviousCoordinates = [...this.state.previousCoordinates, this.state.currentCoordinates];
      this.setState({
      	currentCoordinates: newCoordinates,
      	distance: newDistance,
      	previousCoordinates: newPreviousCoordinates
      })
    };
  }

	calculateTotalSeconds() {
		let hours = Number(this.state.hours);
		let minutes = Number(this.state.minutes);
		let seconds = Number(this.state.seconds);
		return ((((hours * 60 * 60) + (minutes * 60) + seconds)));
	}

	calculateSecondsPerMile() {
		return this.calculateTotalSeconds() / Number(this.state.distance);
	}

	applyDamage() {
		let newUser = this.state.localUser;
		let newMission = this.state.localMission;
		let newTotalPower = this.state.totalPowerGenerated;
		let newDistance = this.state.distance;
    let newTempDistance = this.state.tempDistance;
		missionUpdates = [];

		if (this.state.treadmillModeOn) {
			newDistance = Number((newDistance + (Number(1/this.state.userSetPace))).toFixed(3));
      newTempDistance = Number((newTempDistance + (Number(1/this.state.userSetPace))).toFixed(3));
		}

		// earn power (per minute + distance bonus)
		let powerGeneratedThisMinute = this.state.currentPPM; 

    if (newTempDistance > .25) {
      missionUpdates.push("NEW DISTANCE MILESTONE REACHED!")
      powerGeneratedThisMinute += newUser.mechLevel;
      newTempDistance -= .25;
    }

		// check if currentPower = max
		let newPPM = this.state.currentPPM;
		if (newPPM < newUser.mechLevel * 10) {
			// if not, increase currentPower by PPMIncreaseRate
			newPPM += newUser.mechLevel;
		}

		// increase this.state.boostCounter
		let newBoostCounter = this.state.boostCounter + powerGeneratedThisMinute;
		let newDamageTier = this.state.currentDamageTier;

		if (newBoostCounter >= newDamageTier * (newUser.mechLevel * 15)) {
			newBoostCounter -= newDamageTier * (newUser.mechLevel * 15);
			newDamageTier = newDamageTier === newUser.maxBoost ? newDamageTier : newDamageTier + 1;
		}

		newTotalPower += powerGeneratedThisMinute;

		if (this.state.missionComplete) {
			missionUpdates.push("You generate " + powerGeneratedThisMinute + " power!")
			// once mission is complete points stop increasing, but you continue to earn them
			this.setState({
				currentPPM: newPPM,
				totalPowerGenerated: newTotalPower,
				distance: newDistance,
        tempDistance: newTempDistance
			})
			return;
		}

		// apply the user's damage to their opponents
		let damageDealt = newUser.mechLevel + newDamageTier + newUser.bonusDamage;
		missionUpdates.push("You deal " + damageDealt + " damage!")
		newMission.currentStrength = newMission.currentStrength - damageDealt;

		// check if they win! If so, mark the mission as complete.
		if (newMission.currentStrength <= 0) {
			this.setState({
				currentPPM: newPPM,
				localUser: newUser,
				localMission: newMission,
				totalPowerGenerated: newTotalPower,
				distance: newDistance,
        tempDistance: newTempDistance,
				missionComplete: true
			})
			return;
		}

		// apply enemy-specific attacks

		newMission.specialAbilities.forEach(ability => {
			this.applySpecialAbility(ability, newUser, newMission);
		})

		this.setState({
				currentPPM: newPPM,
				boostCounter: newBoostCounter,
				currentDamageTier: newDamageTier,
				localUser: newUser,
				localMission: newMission,
				totalPowerGenerated: newTotalPower,
				distance: newDistance,
        tempDistance: newTempDistance
			});
	}

	applySpecialAbility(ability, player, opponent) {
		switch (ability.type) {
			case "REGENERATE":
				opponent.currentStrength += ability.payload;
				missionUpdates.push(ability.message);
				return;
			case 'NOTHING':
				return;
		}
	}

	toggleTimer() {
		let toggleVal = !this.state.timerOn;
		if (toggleVal) {
			this.timerID = setInterval(
		      () => this.tick(),
		      1000
		    );
		} else {
			clearInterval(this.timerID);
		}
		this.setState({timerOn: toggleVal})
	}

	stopTimer() {
		if (this.state.timerOn) {
			clearInterval(this.timerID);
			this.setState({timerOn: false})
		}
	}

	tick() {
		let newSeconds = Number(this.state.seconds) + 1;
		let newMinutes = Number(this.state.minutes);
		let newHours = Number(this.state.hours);
		if (newSeconds === 60) {
			this.applyDamage();
			// battleSounds.play();
			newSeconds = 0;
			newMinutes = newMinutes + 1;
		}
		if (newMinutes && newMinutes === 60) {
			newMinutes = 0;
			newHours = newHours + 1;
		}
    this.setState({
      seconds: newSeconds,
      minutes: newMinutes,
      hours: newHours
    });
  	}

  stopRunning() {
  	if (this.state.localMission.currentStrength <= 0) {
			this.handleWin();
		} else {
			this.handleLose();
		}
  }

	handleWin() {
		this.stopTimer();
		let newUser = this.state.localUser;

		// process all the actions in the mission's 'mission complete actions' array
		this.state.localMission.missionCompleteActions.map(action => this.processMissionCompleteAction(action, newUser));
		
    //give the player points and update their completed missions total
		newUser.completedMissions++;
		newUser.totalPower += this.state.totalPowerGenerated;
		this.setState({ 
			showWinModal: true,
			localUser: newUser
		 });
	}

  processMissionCompleteAction(action, user) {
  	switch (action.type) {
  		case "GAIN_POWER":
  			user.totalPower += action.payload;
        missionCompleteMessages.push(action.message);
  			return;
      case "WIN_GAME":
        user.gameOver = true;
        missionCompleteMessages.push(action.message);
        return;
  		case "REMOVE_PIECE":
        missionCompleteMessages.push(action.message);
  			delete user.pieces[user.selectedMissionPieceUID];
  			return;
      case "SPAWN_PIECE":
        missionCompleteMessages.push(action.message);
        user.pieces['mission' + Math.floor(Math.random() * 1000)] = action.payload;
        return;
      case "ADD_SIDEQUEST_TO_POOL":
        user.sidequestPool.push(action.payload);
        missionCompleteMessages.push(action.message);
        return;
      case 'FACTION_ATTITUDE_UP':
        user.factions[action.factionDoingTheLiking].diplomacy[action.factionLiked] += action.amount;
        missionCompleteMessages.push(action.message);
        return;
      case 'ALL_FACTION_ATTITUDES_UP':
        user.factions.forEach(factionKey => {
          user.factions[factionKey].diplomacy[action.factionLiked] += action.amount;
        })
        missionCompleteMessages.push(action.message);
        return;
      case 'FACTION_ATTITUDE_DOWN':
        user.factions[action.factionDoingTheHating].diplomacy[action.factionHated] -= action.amount;
        missionCompleteMessages.push(action.message);
        return;
      case 'RETURN_BUILDING_TO_ARRAY':
        user.factions[action.factionKey].availableBuildings.push(action.buildingKey);
        missionCompleteMessages.push(action.message);
        return;
      case 'DAMAGE_TARGET':
        const loser = user.factions[action.loserKey];
        const winner = user.factions[action.winnerKey]
        const damage = winner.attackLevel - loser.defenseLevel;
        if (damage < 0) damage = 0;
        loser.HP -= damage;
        missionCompleteMessages.push(action.message);
        if (user.factions[action.loserKey].HP <= 0) {
          this.eliminateFaction(user, action.loserKey);
          missionCompleteMessages.push(loser.displayName + ' is destroyed!!!');
        }
        return;
  		default:
  			console.log("Action not recognized!");
  			return;
  	}
  }

  eliminateFaction(user, deadFactionKey) {
    if (deadFactionKey === 'Player') {
      user.gameOver = true;
      missionCompleteMessages.push(user.baseName + ' has been overrun! You lose!')
    } else {
      Object.keys(user.factions).forEach(factionKey => {
        if (factionKey === deadFactionKey) {
          missionCompleteMessages.push(user.factions[factionKey].displayName + ' has been eliminated!');
          delete user.factions[deadFactionKey];
        } else {
          delete user.factions[factionKey].diplomacy[deadFactionKey];
        }
      })
      if (Object.keys(user.factions).length === 1) {
        user.gameOver = true;
        missionCompleteMessages.push('All other factions have been eliminated! You win I guess, you monster')
      }
    }
  }

	handleLose() {
		this.stopTimer();
		let newUser = this.state.localUser;
    let newMission = this.state.localMission;
		newUser.totalPower += this.state.totalPowerGenerated;
    // if the piece is a boss, restore its health to full
    if (localUser.pieces[localUser.selectedMissionPieceUID].type === 'Boss') {
      newMission.currentStrength = newMission.maxStrength;
    }
		this.setState({ 
			showLoseModal: true,
			localUser: newUser,
      localMission: newMission
		 });
	}

	onAccept() {
    missionCompleteMessages = [];
		this.setState({ 
			showLoseModal: false,
			showWinModal: false,
			confirmationModalVisible: true
		})
	}

	onLogRun() {
		this.setState({
			confirmationModalVisible: false
		})

		let resetUser = this.state.localUser;
    resetUser.selectedMissionPieceUID = null;
		this.props.updateUser(resetUser);

		//update user pace and distance
		let playerPace = this.calculateSecondsPerMile().toFixed(2);

  	// log the run
		const date = moment().format('dddd, MMMM Do, YYYY, h:mm:ss a');
		const duration = this.state.hours + " hr " + this.state.minutes + " min " + this.state.seconds +" sec";
		const distance = Number(this.state.distance);
		this.props.logRun(date, duration, distance, playerPace);

		Actions.runList();
	}

	calculateDistanceTraveled(x1, y1, x2, y2) {
			let radx1 = Math.PI * x1/180;
	    let radx2 = Math.PI * x2/180;
	    let rady1 = Math.PI * y1/180;
	    let rady2 = Math.PI * y2/180;
	    let theta = y1-y2;
	    let radtheta = Math.PI * theta/180;
	    let dist = Math.sin(radx1) * Math.sin(radx2) + Math.cos(radx1) * Math.cos(radx2) * Math.cos(radtheta);
	    dist = Math.acos(dist);
	    dist = dist * 180/Math.PI;
	    dist = dist * 60 * 1.1515;
	    return dist;
	}

	showConfirmationModal() {
		this.setState({
			confirmationModalVisible: true
		})
	}

  renderMission() {
    if (this.state.missionComplete) {
      return(
        <Text style={{fontWeight: 'bold'}}> 
        MISSION COMPLETE!{'\n'}
        GENERATOR MODE ACTIVATED.
        </Text>
      )
    }
    return(
        <Text style={{fontWeight: 'bold'}}>
        OPPONENT HEALTH: {this.state.localMission.currentStrength}
        </Text>
      )
  }

	renderUpdates() {
		if (this.state.minutes > 0) {
			return <Text style={{fontStyle: 'italic'}}>{missionUpdates.join("\n")}</Text>
		} else {
      return <Text style={{fontStyle: 'italic'}}>SYSTEMS READY.</Text>
    }
	}

	renderPaceInput() {
		if (this.state.treadmillModeOn) {
			return (
			<KeyboardAvoidingView
        style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
        behavior='padding'
        >
        <Text style={{padding: 5}}>ENTER PACE{'\n'}(min/mi):</Text>
        <View style={{
            flex: 1,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#eaedee'
          }}>
  				<Input
  					placeholder="0.0"
  					onChangeText={pace => this.setState({userSetPace: pace})}
  					value={this.state.userSetPace.toString()}	
  					/>
        </View>
			</KeyboardAvoidingView>
			)
		}
	}

  renderBoostProgress() {
    const barColor = this.state.missionComplete ? '#7fe2e2' : '#fffb38';
    if (this.state.currentDamageTier !== 5) {
      let progress = this.state.boostCounter / (this.state.currentDamageTier * (this.state.localUser.mechLevel * 15));
      return <ProgressBar
          progress={progress}
          width={275}
          height={15}
          color={barColor}
          borderWidth={2}
          borderColor={'#000000'}
          borderRadius={10}
        />
    }
  }

	render() {

    const backgroundColor = this.state.timerOn ? '#fcffaf' : "#d5d6cf";

		return (
			<ImageBackground source={require('../images/background.png')} style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
  			<ScrollView>

  			<Card>
  				<CardSection style={{justifyContent: 'center', backgroundColor}}>
  					<Text
  						style={{
  							fontSize: 40, 
  							fontWeight: '700' 
  						}}
  					>
  					{("0" + this.state.hours).slice(-2)} : {("0" + this.state.minutes).slice(-2)} : {("0" + this.state.seconds).slice(-2)}
  					</Text>
  				</CardSection>
  				<CardSection style={{ justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold'}}>{this.state.distance} MI</Text>
            <Text style={{fontWeight: 'bold'}}>{this.state.totalPowerGenerated} POWER GENERATED</Text>
          </CardSection>
          <CardSection style={styles.cardHeader}>
            <Text style={styles.headerText}>CURRENT MISSION: {this.state.localMission.title}</Text>
          </CardSection>
          <CardSection style={{height: 60, justifyContent: 'center', alignItems: 'center'}}>
            {this.renderMission()}
          </CardSection>
          <CardSection style={styles.cardHeader}>
            <Text style={styles.headerText}>MISSION UPDATES</Text>
          </CardSection>
          <CardSection style={{height: 80, justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView style={{maxHeight: 60}}>
              {this.renderUpdates()}
            </ScrollView>
          </CardSection>
          <CardSection style={styles.cardHeader}>
            <Text style={styles.headerText}>BOOST LEVEL</Text>
          </CardSection>
          <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}>BOOST LEVEL {this.state.currentDamageTier}:</Text>
              <Text>{this.state.localUser.mechLevel + this.state.currentDamageTier + this.state.localUser.bonusDamage} DAMAGE</Text>
              {this.renderBoostProgress()}
            </View>
          </CardSection>
  				<CardSection style={{flexDirection: 'column'}}>
  					<View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
  						<Text style={{
  							fontSize: 16, 
  							fontWeight: '700', 
  							paddingRight: 5}}>TREADMILL MODE</Text>
  		        <Switch
  		          onValueChange={(value) => this.setState({treadmillModeOn: value})}
  		          style={{marginBottom: 10}}
  		          value={this.state.treadmillModeOn} />
  		      </View>
  				  {this.renderPaceInput()}
          </CardSection>
  				<CardSection>
  					<Button onPress={this.toggleTimer}>
  						START/STOP
  					</Button>
  					<Button onPress={this.stopRunning.bind(this)}>
  						DONE
  					</Button>
  				</CardSection>
  			</Card>
  			
  			</ScrollView>
        </KeyboardAvoidingView>

			<ConfirmationModal
				visible={this.state.confirmationModalVisible}
				onAccept={this.onLogRun.bind(this)}
				buttonText={"Looks great amigo"}
        	>
        <Card>
        <CardSection style={{
          justifyContent:'center',
          backgroundColor: '#ce42b7'
        }}>
          <Text style={styles.headerText}>HOW'S THIS LOOK MY MAN</Text>
        </CardSection>
        <CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>Seconds</Text>
        </CardSection>
        <CardSection>
					<Input
						placeholder={this.state.seconds.toString()}
						onChangeText={seconds => this.setState({seconds})}
						value={this.state.seconds.toString()}	
						/>
				</CardSection>
				<CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>Minutes</Text>
        </CardSection>
        <CardSection>
					<Input
						placeholder={this.state.minutes.toString()}
						onChangeText={minutes => this.setState({minutes})}
						value={this.state.minutes.toString()}	
						/>
				</CardSection>
				<CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>Hours</Text>
        </CardSection>
        <CardSection>
					<Input
						placeholder={this.state.hours.toString()}
						onChangeText={hours => this.setState({hours})}
						value={this.state.hours.toString()}	
						/>
				</CardSection>
				<CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>Distance (mi)</Text>
        </CardSection>
        <CardSection>
					<Input
						placeholder={this.state.distance.toString()}
						onChangeText={distance => this.setState({distance})}
						value={this.state.distance.toString()}	
						/>
				</CardSection>
				<CardSection style={{backgroundColor: "#ce42b7"}}>
					<View>
						<Text style={{fontSize: 20}}>AVERAGE PACE: {convertSecondsToPaceString(this.calculateSecondsPerMile())}/mile</Text>
					</View>
				</CardSection>
				</Card>
	    </ConfirmationModal>

			<ConfirmationModal
				visible={this.state.showWinModal}
				onAccept={this.onAccept.bind(this)}
				buttonText={"hooray"}
        	>
          <ScrollView style={{maxHeight: 300}}>
            <Text>
              {missionCompleteMessages.join("\n")}
              {"\n"}+{this.state.totalPowerGenerated} POWER
            </Text>
        </ScrollView>
	    </ConfirmationModal>

	    <ConfirmationModal
				visible={this.state.showLoseModal}
				onAccept={this.onAccept.bind(this)}
				buttonText={"better part of valor"}
	        	>
	        <Text>RETREAT!{"\n"}
	         +{this.state.totalPowerGenerated} POWER</Text>
	    </ConfirmationModal>

			</ImageBackground>
			);
	};
}

const styles = {
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  cardHeader: {
    justifyContent: 'center',
    backgroundColor: "#000"
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold'
  }
}

const mapStateToProps = state => {
  const user = state.user;
  return { user };
};

export default connect(mapStateToProps, { logRun, fetchUser, updateUser, updateMech, addPiece, removePiece })(MissionDashboard);