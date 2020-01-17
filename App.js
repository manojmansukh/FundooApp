import React, { Component } from 'react'
import MainNavigator from './src/Component/MainNavigator';
import NavigationDrawerStructure from './src/Component/NavigationDrawerStructure'
import Example from './src/Component/Example'
import DialogReminder from './src/Component/DialogReminder'
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
export default class App extends Component{
  render(){
    return(
     
            //<DialogReminder/>
           // <AppDrawerNavigator/>
         <MainNavigator/>
          //<Example/>
          //<NavigationDrawerStructure/>
    );
  }  
}