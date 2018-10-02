import React, { Component } from 'react';
import { Text, View, ImageBackground, Modal } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import { createUser, addPiece, setFactions } from '../reducers/UserState';
import { fetchRuns } from '../reducers/RunState';
import { ConfirmationModal } from './ConfirmationModal';
import { Actions } from 'react-native-router-flux';
import * as FactionLibrary from './GameLibraries/FactionLibrary';
import { generateBase } from './Utilities/Generators';
import { generateRandomMission } from './Utilities/RandomMissionGenerator';

class NewUserScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
      showLoadingModal: true,
			showWelcomeModal: false,
      playerTownName: 'New Playerville'
		}
	}

	componentDidMount() {
		this.props.createUser(Date.now(), this.state.playerTownName);

    // we're going to build out this factionBases object and set it on the user we just created
    let factionBases = {};

    let allFactions = FactionLibrary.allFactions;
    let factionsInThisGame = [];
    let diplomacyObject = {
      Player: 30 + Math.floor(Math.random() * 20)
    };
    
    for (let i=0; i<3; i++) {
      let rando = Math.floor(Math.random() * allFactions.length);

      // I guess splice() returns an array now? So get the element out of the returned array
      let randoFaction = allFactions.splice(rando, 1)[0];

      // add it to the Diplomacy Object
      diplomacyObject[randoFaction] = 30 + Math.floor(Math.random() * 20);
      factionsInThisGame.push(randoFaction);
    }

    // create bases for every faction in the game
    factionsInThisGame.forEach(factionKey => {
      let factionBase = generateBase(FactionLibrary[factionKey]);
      factionBase.diplomacy = diplomacyObject;
      factionBases[factionKey] = factionBase;
    })

    // generate a base for the player
    let playerBase = generateBase(FactionLibrary.Player, this.state.playerTownName);
    playerBase.diplomacy = diplomacyObject;
    factionBases['Player'] = playerBase;

    this.props.setFactions(factionBases);

		let newSidequest = generateRandomMission(1);
		this.props.addPiece(newSidequest);

    let newerSidequest = generateRandomMission(1);
    this.props.addPiece(newerSidequest);

    let newestSidequest = generateRandomMission(1);
    this.props.addPiece(newestSidequest);

    this.setState({
      showLoadingModal: false,
      showWelcomeModal: true
    })
	}

	onAccept() {
		this.setState({ showWelcomeModal: false });
		Actions.main({type: 'reset'});
	}

	render() {
		return (
			<ImageBackground source={require('../images/background.png')} style={styles.container}>
				<View>
					<ConfirmationModal
						visible={this.state.showWelcomeModal}
						onAccept={this.onAccept.bind(this)}
						buttonText={"Hello"}
			      >
			      <Text>WELCOME TO YOUR COLONY!!</Text>
			    </ConfirmationModal>
				</View>

        <View>
          <Modal
            visible={this.state.showLoadingModal}
            transparent
            animationType="fade"
            >
            <View style={styles.containerStyle}>
              <CardSection style={styles.cardSectionStyle}>
                <Text style={{fontWeight: 'bold'}}>LOADING...</Text>
              </CardSection>
            </View>
          </Modal>
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

export default connect(mapStateToProps, { createUser, fetchRuns, addPiece, setFactions })(NewUserScreen);