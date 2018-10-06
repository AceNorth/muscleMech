import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ImageBackground, View, ScrollView, Modal } from 'react-native';
import { updatePiece, updateUser, updateFaction } from '../reducers/UserState';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class BaseManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidequestPackModalVisible: false,
      selectedSidequestPackModalVisible: false,
      selectedSidequestPack: {
        title: 'NOTHING',
        description: 'Nope'
      },
      base: {
        title: 'LOADING...',
        HP: 1
      }
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.setState({base: this.props.user.factions.Player});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({base: nextProps.user.factions.Player});
    }
  }

  showSidequestPackModal() {
    this.setState({sidequestPackModalVisible: true});
  }

  hideSidequestPackModal() {
    this.setState({sidequestPackModalVisible: false});
  }

  navigateToRuns() {
    Actions.runList();
  }

  navigateToDiplomacy() {
    Actions.diplomacy();
  }

  shouldBeDisabled(playerNum, targetNum) {
    // returns 'false' if the button should not be disabled (because user has enough currency)
    return (playerNum < targetNum);
  }

  renderSidequestPacks() {
    return Object.keys(this.props.user.availableSidequests).map(key => {
      const sidequestPack = this.props.user.availableSidequests[key];
      if (!sidequestPack.purchased) {
        return (
          <CardSection key={key}>
            <Button 
              disabled={this.shouldBeDisabled(this.props.user.totalPower, sidequestPack.cost)}
              onPress={() => this.selectSidequestPack(key)}>
              <Text>{sidequestPack.title} - {sidequestPack.cost} power</Text>
            </Button>
          </CardSection>)
      } else {
        return (
          <CardSection key={key}>
            <Button 
              disabled={true}
              onPress={() => {}}>
              <Text>{sidequestPack.title} - PURCHASED</Text>
            </Button>
          </CardSection>)
      }
    })
  }

  selectSidequestPack(key) {
    this.setState({
      sidequestPackModalVisible: false,
      selectedSidequestPackKey: key,
      selectedSidequestPack: this.props.user.availableSidequests[key],
      selectedSidequestPackModalVisible: true
    })
  }

  hideSelectedSidequestPackModal() {
    this.setState({
      sidequestPackModalVisible: true,
      selectedSidequestPackKey: '',
      selectedSidequestPack: {
        title: 'NOTHING',
        description: 'Nope'
      },
      selectedSidequestPackModalVisible: false
    })
  }

  purchaseSidequestPack(key) {
    let updatedUser = this.props.user;
    const sidequestPack = this.props.user.availableSidequests[key];

    // apply the purchase reward
    sidequestPack.buildEffects.forEach(buildEffect => {
      this.applyBuildEffect(buildEffect, updatedUser); 
    })
    if (sidequestPack.sidequests !== undefined) {
      updatedUser.sidequestPool = updatedUser.sidequestPool.concat(sidequestPack.sidequests);
    };
    updatedUser.availableSidequests[key].purchased = true;
    updatedUser.totalPower -= sidequestPack.cost;
    this.props.updateUser(updatedUser);
    this.setState({
      sidequestPackModalVisible: false,
      selectedSidequestPackKey: '',
      selectedSidequestPack: {
        title: 'NOTHING',
        description: 'Nope'
      },
      selectedSidequestPackModalVisible: false
    });
  }

  applyBuildEffect(buildEffect, user) {
    switch (buildEffect.type) {
      case 'INCREASE_STAT':
        user[buildEffect.target] += buildEffect.value;
        return;
      case 'SPAWN_PIECE':
        let newSidequest = buildEffect.payload;
        const newSidequestUid = 'sidequest' + Math.floor(Math.random() * 10000);
        newSidequest.uid = newSidequestUid;
        user.pieces[newSidequestUid] = newSidequest;
        return;
      default:
        return;
    }
  }

  renderShields() {
    let output = [];
    for (let i = 0; i < this.state.base.HP; i++) {
      output.push(
      <Icon
        key={"icon" + i}
        style={{padding: 3}} 
        size={30}
        color="#ff419c"
        name="sun-o"
        />
      )
    }
    return output;
  }

  render() {
    return (
    <ImageBackground source={require('../images/background.png')} style={styles.container}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <Card>
          <CardSection style={styles.cardHeader}>
            <Text style={styles.headerText}>YOUR BASE: {this.state.base.title.toUpperCase()}</Text>
          </CardSection>
          <CardSection>
            <Text>AVAILABLE POWER: {this.props.user.totalPower}</Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection style={styles.cardHeader}>
            <Text style={styles.headerText}>SHIELDS</Text>
          </CardSection>
          <CardSection style={{justifyContent: 'center'}}>
            {this.renderShields()}
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Button onPress={this.navigateToRuns} style={{backgroundColor: '#cc0000'}}>
              VIEW PAST RUNS
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.navigateToDiplomacy} style={{backgroundColor: '#ad42f4'}}>
              DIPLOMACY
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.showSidequestPackModal()}>
              PURCHASE BASE UPGRADES
            </Button>
          </CardSection>
        </Card>
      </ScrollView>

    <Modal
      visible={this.state.sidequestPackModalVisible}
      transparent
      animationType="fade"
      >
      <View style={styles.containerStyle}>
        <Card>

          <ScrollView style={{maxHeight: 300}}>
            {this.renderSidequestPacks()}
          </ScrollView>

          <CardSection>
            <Button onPress={() => this.hideSidequestPackModal()}>
            ALL DONE
            </Button>
          </CardSection>
        </Card>
      </View>
    </Modal>

    <Modal
      visible={this.state.selectedSidequestPackModalVisible}
      transparent
      animationType="fade"
      >
      <View style={styles.containerStyle}>
        <Card>

          <CardSection style={styles.cardHeader}>
            <Text style={styles.headerText}>{this.state.selectedSidequestPack.title}</Text>
          </CardSection>

          <CardSection>
            <Text>{this.state.selectedSidequestPack.description}</Text>
          </CardSection>

          <CardSection>
            <Button 
            style={{backgroundColor: '#bc0000'}}
            onPress={() => this.purchaseSidequestPack(this.state.selectedSidequestPackKey)}>
            PURCHASE - {this.state.selectedSidequestPack.cost}
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.hideSelectedSidequestPackModal()}>
            NEVER MIND
            </Button>
          </CardSection>
        </Card>
      </View>
    </Modal>
    
    </ImageBackground>

    );
  }
}

const styles = {
  container: {
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null
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
  const user = state.user

  return { user };
};

export default connect(mapStateToProps, { updatePiece, updateUser, updateFaction })(BaseManagement);