import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ImageBackground, ScrollView } from 'react-native';
import { updateUser, updateMech } from '../reducers/UserState';
import { Card, CardSection, Button } from './common';

class CharacterManagement extends Component {

  upgradeMech() {
    const newPower = this.props.user.totalPower - (this.props.user.mechLevel * 1000);
    let mechLevel = this.props.user.mechLevel + 1;
    this.props.updateUser({
      mechLevel,
      totalPower: newPower
    });
  }

  shouldBeDisabled(playerNum, targetNum) {
    // returns 'false' if the button should not be disabled (because user has enough currency)
    return (playerNum < targetNum);
  }

  renderDamageTiers() {
    let damageTiers = [];
    for (let i=1; i < this.props.user.maxBoost; i++) {
      damageTiers.push("LVL" + i + ": BOOST COUNT: " + (i * (this.props.user.mechLevel * 15)) + " DAMAGE: " + (i + this.props.user.mechLevel));
    }
    return <Text>{damageTiers.join('\n')}</Text>
  }

  render() {
    return (
    <ImageBackground source={require('../images/background.png')} style={styles.container}>
      <ScrollView style={styles.container}>

      <Card>
        <CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>YOUR MECH</Text>
        </CardSection>
        <CardSection>
          <Text>AVAILABLE POWER: {this.props.user.totalPower}</Text>
        </CardSection>
        <CardSection>
          <Text>LEVEL: {this.props.user.mechLevel}</Text>
        </CardSection>
        <CardSection>
          <Text>MAX POWER PER MINUTE: {this.props.user.mechLevel}</Text>
        </CardSection>
        <CardSection>
          <Text>POWER PER DISTANCE: {this.props.user.mechLevel}/quarter mile</Text>
        </CardSection>
        <CardSection style={{
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Text style={{fontWeight: 'bold'}}>DAMAGE LEVELS</Text>
          {this.renderDamageTiers()}
        </CardSection>
        <CardSection>
          <Text>BONUS DAMAGE: {this.props.user.bonusDamage}</Text>
        </CardSection>
        <CardSection>
          <Text>MAX BOOST LEVEL: {this.props.user.maxBoost}</Text>
        </CardSection>
      </Card>
      <Card>
        <CardSection>
          <Button 
            disabled={this.shouldBeDisabled(this.props.user.totalPower, (this.props.user.mechLevel * 1000))}
            onPress={this.upgradeMech.bind(this)}>
            UPGRADE MECH - {this.props.user.mechLevel * 1000} power
          </Button>
        </CardSection>
        
      </Card>
      </ScrollView>
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

export default connect(mapStateToProps, { updateUser, updateMech })(CharacterManagement);