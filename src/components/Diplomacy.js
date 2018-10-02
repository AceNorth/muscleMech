import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, ImageBackground } from 'react-native';
import { Card, CardSection } from './common';

class Diplomacy extends Component {

  renderAttitude(number) {
    if (number < 10) return 'Hates';
    else if (number < 50) return 'Dislikes';
    else if (number < 80) return 'Likes';
    else return 'Loves';
  }

  renderFactionName(factionKey) {
    if (factionKey === 'Player') return this.props.user.baseName;
    return this.props.user.factions[factionKey].displayName;
  }

  renderFaction(faction) {
    return (
      <Card>
        <CardSection style={[styles.cardHeader, {backgroundColor: faction.factionColor}]}>
          <Text style={styles.headerText}>{faction.displayName}</Text>
        </CardSection>
        <CardSection>
          <Text>Shields remaining: {faction.HP}</Text>
        </CardSection>

        {Object.keys(faction.diplomacy).map(otherFactionKey => {
          if (otherFactionKey === faction.factionKey) return;
          let otherFaction = faction.diplomacy[otherFactionKey]
          return (<CardSection>
            <Text>
              {this.renderAttitude(faction.diplomacy[otherFactionKey])} {this.renderFactionName(otherFactionKey)}
            </Text>
            </CardSection>)
        })}
    
      </Card>
    );
  }

  render() {
    return (
    <ImageBackground source={require('../images/background.png')} style={styles.container}>

      <Card>
        <CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>DIPLOMACY</Text>
        </CardSection>
      </Card>

      <ScrollView>
        {Object.keys(this.props.user.factions).map(factionKey => this.renderFaction(this.props.user.factions[factionKey]))}
      </ScrollView>

    </ImageBackground>
    );
  }
}

const styles ={
  container: {
    flex: 1,
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
  const user = state.user

  return { user };
};

export default connect(mapStateToProps)(Diplomacy);