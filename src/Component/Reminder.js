import React, { Component } from 'react';
import { StyleSheet, View, Text ,TouchableOpacity,Image} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Appbar, Card } from 'react-native-paper';
import AppBar1 from './AppBar1'
export default class Remainder extends Component {
  //Screen2 Component
  render() {
    return (
      <View>
        <AppBar1 navigation={this.props.navigation} />
      <View style={styles.MainContainer}>
        
        <Text style={{ fontSize: 23 }}> Screen 2 </Text>
      </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});