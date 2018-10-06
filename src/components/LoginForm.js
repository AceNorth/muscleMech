import React, { Component } from 'react';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Text, ImageBackground, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../reducers/AuthState';

class LoginForm extends Component {

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({email, password});
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size='large' />
		} else {
			return <Button onPress={this.onButtonPress.bind(this)}>
						LOG IN
					</Button>
		}
	}

	renderError() {
		if (this.props.error) {
			return (<Text style={styles.errorTextStyle}>
							{this.props.error}
						</Text>)
		} else return null;
	}

	render() {
		return (
			<ImageBackground source={require('../images/background.png')} style={styles.container}>
				<View style={{
					paddingTop: 20,
					flex: 1
				}}>
					<View style={{
						backgroundColor: 'transparent',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
		        <Text style={{
		        	fontSize: 30,
		        	paddingTop: 20,
		        	fontWeight: 'bold'
		        }}>
		        MUSCLE MECH
		        </Text>
		      </View>
					<Card>
						<CardSection>
							<Input
								label="Email"
								placeholder="email@gmail.com"
								onChangeText={this.onEmailChange.bind(this)}
								value={this.props.email}
							/>
						</CardSection>

						<CardSection>
							<Input
								secureTextEntry
								label="Password"
								placeholder="password"
								onChangeText={this.onPasswordChange.bind(this)}
								value={this.props.password}
							/>
						</CardSection>

						{this.renderError()}

						<CardSection>
							{this.renderButton()}
						</CardSection>
					</Card>
				</View>
			</ImageBackground>
		)
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	container: {
	    flex: 1,
	    // remove width and height to override fixed static size
	    width: null,
	    height: null,
	  }
}

const mapStateToProps = ({ auth }) => {
	const {email, password, error, loading} = auth;
	return { email, password, error, loading }
}

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser
	 })(LoginForm);