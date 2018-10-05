import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
	Text, 
	View,
	ImageBackground, 
	TouchableOpacity, 
	ScrollView,
	Modal,
} from 'react-native';
import { Confirm, Card, CardSection } from './common';
import { selectMission, addPiece, updatePiece } from '../reducers/UserState';
import { Actions } from 'react-native-router-flux';

import { Button } from './common/Button';

class MissionSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedPieceModalVisible: false,
			selectedMissionModalVisible: false,
			selectedPiece: null,
			selectedMission: {}
		}
	}

	onAccept() {
		this.props.selectMission(
			this.state.selectedMission,
			this.state.selectedPiece.uid,
			this.state.selectedMissionIndex);
		this.setState({ selectedMissionModalVisible: false, selectedMission: {} });
		Actions.mission();
	}

	onDecline() {
		this.setState({
			selectedMissionModalVisible: false,
			selectedMission: {},
		});
	}

	selectPiece(piece) {
		this.setState({selectedPiece: piece, selectedPieceModalVisible: true})
	}

	selectMission(mission, index) {
		this.setState({
			selectedMission: mission,
			selectedMissionIndex: index,
			selectedMissionModalVisible: true,
			selectedPieceModalVisible: false
		})
	}

	onCancel() {
		this.setState({
			selectedPieceModalVisible: false,
			selectedPiece: null,
		});
	}

	renderPiece(piece) {
		return (
			<TouchableOpacity key={Math.random()} onPress={() => this.selectPiece(piece)}>
				<CardSection style={{
					backgroundColor: `${piece.factionColor}`,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					padding: 5
				}}>
					<Text style={{fontWeight: 'bold'}}>
					{piece.title}
					</Text>
				</CardSection>
			</TouchableOpacity>
			)
	}

	renderMissionCard(mission, index) {
		return (
			<TouchableOpacity key={Math.random()} onPress={() => this.selectMission(mission, index)}>
				<CardSection style={{
            justifyContent: 'center'
          }}>
					<Text style={styles.textStyle}>
						{mission.title}
					</Text>
	      </CardSection>
      </TouchableOpacity>
      )
	}

	renderMissionCards() {
    if (this.state.selectedPiece) {
      return (
      <View>
        <ScrollView style={{maxHeight: 300}}>
          <CardSection style={{
            backgroundColor: `${this.state.selectedPiece.factionColor}`,
            justifyContent: 'center'
          }}>
            <Text style={styles.textStyle}>
              {this.state.selectedPiece.title.toUpperCase()}
            </Text>
          </CardSection>
          <CardSection style={{
            justifyContent: 'center'
          }}>
            <Text>
              {this.state.selectedPiece.description}
            </Text>
          </CardSection>
        {this.state.selectedPiece.missions.map((mission, index) => this.renderMissionCard(mission, index))}
        </ScrollView>
        <CardSection>
          <Button onPress={() => this.onCancel()}>
            NEVER MIND
          </Button>
        </CardSection>
      </View>
      );
    }
	}

	displaySpecialAbilities(mission) {
		if (mission.hasOwnProperty('specialAbilities')) {
			let output = [];
			mission.specialAbilities.forEach(ability => {
				if (!ability.displayName) return;
				output.push(ability.displayName);
			})
			if (output.length > 0) {
				output = output.join("\n");
				return (
					<Text style={{fontWeight: 'bold'}}>
					THIS UNIT HAS THE FOLLOWING SPECIAL ABILITIES:{'\n'}{output}{'\n'}
					</Text>
					)
			}
		}
	}

	render() {
		return (
			<ImageBackground source={require('../images/background.png')} style={styles.container}>
				<ScrollView>

					<Card>
					 {this.props.pieces.map(piece => this.renderPiece(piece))}
					</Card>

          <Card>
            <CardSection style={styles.cardHeader}>
              <Text style={styles.headerText}>EXPEDITIONS</Text>
            </CardSection>
            {this.props.user.expeditions.map(expedition => this.renderPiece(expedition))}
          </Card>

				</ScrollView>

				<Modal
		      visible={this.state.selectedPieceModalVisible}
		      transparent
		      animationType="fade"
		      onRequestClose={this.onCancel}
		    >
		      <View style={styles.containerStyle}>
			      <Card>
			      {this.renderMissionCards()}
			      </Card>
		      </View>
		    </Modal>

				<Confirm
					visible={this.state.selectedMissionModalVisible}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
		        	>
		        <Text style={{
		        	fontWeight: 'bold'
		        }}>
		          {this.state.selectedMission.title}{"\n"}{"\n"}
		        </Text>
            <Text>
              {this.state.selectedMission.description}{"\n"}{"\n"}
            </Text>
		        <Text>
		          POINTS TO BEAT: {this.state.selectedMission.currentStrength}{"\n"}{"\n"}
		        </Text>
		        {this.displaySpecialAbilities(this.state.selectedMission)}
		        <Text>ACCEPT THIS MISSION?</Text>
		    </Confirm>

			</ImageBackground>
		)
	}

}

const styles = {
	container: {
    flex: 1,
    width: null,
    height: null
	},
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
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
  const pieces = _.map(state.user.pieces, (val, uid) => {
    return {...val, uid}
  })

  return { 
  	pieces,
    user
  	 };
};

export default connect(mapStateToProps, { selectMission, addPiece, updatePiece })(MissionSelector);