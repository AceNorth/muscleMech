import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MissionDashboard from './components/MissionDashboard';
import MissionSelector from './components/MissionSelector';
import RunList from './components/RunList';
import BaseManagement from './components/BaseManagement';
import NewUserScreen from './components/NewUserScreen';
import ReturningUserScreen from './components/ReturningUserScreen';
import MechManagement from './components/MechManagement';
import Diplomacy from './components/Diplomacy';

const RouterComponent = () => {
	return (
		<Router>
			<Scene hideNavBar={true}>
				<Scene key="auth">
					<Scene key="login"
						component={ LoginForm }
						hideNavBar={true}
						/>
					<Scene key="newUser" component={ NewUserScreen } title="Welcome!" />
					<Scene key="returningUser" component={ ReturningUserScreen } title="Welcome Back!" />
				</Scene>
				<Scene key="main">
	        <Scene 
	          key="baseManagement" 
	          component={BaseManagement}
	          onRight={() => Actions.missionSelector()} 
	          rightTitle="World Map"
	          onLeft={() => Actions.mechManagement()}
	          leftTitle="Mech Garage"
	        />
					<Scene 
						key="missionSelector" 
						component={MissionSelector} 
						title="World Map"
						/>
					<Scene 
						key="mission" 
						component={MissionDashboard} 
						title="Your Mission" 
					/>
					<Scene 
						key="mechManagement" 
						component={MechManagement} 
						title="Mech Garage" 
					/>
					<Scene 
						key="runList" 
						component={RunList} 
						title="Runs"
						onLeft={() => Actions.baseManagement()}
	          leftTitle="Base"
					/>
					<Scene 
						key="diplomacy" 
						component={Diplomacy} 
						title="Diplomacy"
						onLeft={() => Actions.baseManagement()}
	          leftTitle="Base"
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;

