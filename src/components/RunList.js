import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, Image, View } from 'react-native';
import { fetchRuns } from '../reducers/RunState';
import { fetchUser } from '../reducers/UserState';
import { Card, CardSection } from './common';
import { convertSecondsToPaceString } from './Utilities/Utilities';

class RunList extends Component {

  componentWillMount() {
    this.props.fetchRuns();
    this.props.fetchUser();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ runs }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(runs);
  }

  renderRow(run) {

    return (
      
      <Card>
        <CardSection style={styles.cardHeader}>
          <Text style={styles.headerText}>{run.date}</Text>
        </CardSection>

        <CardSection>
          <Text>DURATION: {run.duration}</Text>
        </CardSection>

        <CardSection>
          <Text>DISTANCE: {run.distance} mi</Text>
        </CardSection>

        <CardSection>
          <Text>PACE: {convertSecondsToPaceString(run.pace)} /mi</Text>
        </CardSection>
    
      </Card>
    );
  }

  render() {
    return (
    <Image source={require('../images/background.png')} style={styles.container}>

    <Card>
      <CardSection style={styles.cardHeader}>
        <Text style={styles.headerText}> YOUR RECORDS </Text>
      </CardSection>

      <CardSection>
        <Text> YOU HAVE COMPLETED {this.props.user.completedMissions} MISSIONS </Text>
      </CardSection>
  
    </Card>

    <Card>
      <CardSection style={styles.cardHeader}>
        <Text style={styles.headerText}> YOUR PAST RUNS </Text>
      </CardSection>
    </Card>

    <ListView
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
    />
    </Image>
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
  const runs = _.map(state.runs.runs, (val, uid) => {
    return {...val, uid}
  })

  const user = state.user

  return { runs, user };
};

export default connect(mapStateToProps, { fetchRuns, fetchUser })(RunList);