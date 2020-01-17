
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './SplashScreen'
import LoginPage from './LoginPage'
import RegistrationPage from "./RegistrationPage"
import FotgotPass from "./ForgotPass"
import Welcome from "./Welcome"
import NavigationDrawerStructure from './NavigationDrawerStructure'
import Logout from './Logout'
import CreateNote from './CreateNote'
import EditNote from './EditeNote'
import DialogReminder from './DialogReminder'
import Search from './Search'
import Deleted from './Deleted'

const MainNavigator = createStackNavigator(
  {
    //Home:Home,
    SplashScreen:{screen : SplashScreen,navigationOptions : {header : null}},
    SignIn :{screen : LoginPage,navigationOptions : {header : null}},
    signOut : {screen : Logout,navigationOptions : {header : null} },
    SignUp : RegistrationPage,
    ForgotPass : FotgotPass,
    Welcome : Welcome,
    Drawer:{screen : NavigationDrawerStructure,navigationOptions : {header : null}},
    CreateNote:{screen : CreateNote,navigationOptions:{header : null}},
    EditNote:{screen : EditNote,navigationOptions:{header : null}},
    DialogReminder: DialogReminder,
    Search : {screen : Search,navigationOptions:{header : null}},
    // Deleted : {screen : Deleted,navigationOptions:{header : null}},

  },
  {
    initialRouteName: 'SplashScreen',
  }
);

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;