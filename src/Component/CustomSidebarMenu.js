import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Home from './Home'

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'image',
        navOptionName: 'Second Screen',
        screenToNavigate: 'NavScreen2',
      },
      {
        navOptionThumb: 'build',
        navOptionName: 'Third Screen',
        screenToNavigate: 'NavScreen3',
      },
    ];
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
                <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                <View ><Text style={{color: '#4285F4',fontSize:25,fontWeight:'bold'}}>F</Text></View>
                <View><Text style={{color: '#DB4437',fontSize:25,fontWeight:'bold'}}>u</Text></View>
                <View ><Text style={{color: '#F4B400',fontSize:25,fontWeight:'bold'}}>n</Text></View>
                <View ><Text style={{color: '#4285F4',fontSize:25,fontWeight:'bold'}}>D</Text></View>
                <View ><Text style={{color: '#0F9D58',fontSize:25,fontWeight:'bold'}}>o</Text></View>
                <View ><Text style={{color: '#DB4437',fontSize:25,fontWeight:'bold'}}>o</Text></View>
                <View ><Text style={{color: '#474a49',fontSize:25,fontWeight:'bold'}}> Notes</Text></View>

                </View>

        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});