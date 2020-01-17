import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, Card, Searchbar } from 'react-native-paper';
import SearchField from 'react-search-field';
import { Avatar } from 'react-native-paper';
import SearchInput, { createFilter } from 'react-native-search-filter';

export default class AppBar1 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listView: true,
      searchTerm: '',
    }
  }
  toggleDrawer() {
    console.log(this.props);
    this.props.navigation.toggleDrawer()
  };
  GridView = () => {
    this.setState({ listView: !this.state.listView });
  }

  render() {
    return (

      <Appbar style={{ backgroundColor: 'white',borderRadius:8,margin:10 }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          
          <View style={{ width: '70%', backgroundColor: 'white', flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image
                source={require('../Image/drawer.png')}
                style={{ width: 25, height: 25, margin: 10, tintColor: 'black' }}/>
            </TouchableOpacity>
            
            <Text onPress={() => this.props.navigation.navigate('Search')}
            // onPress = {() => this.props.navigation.navigate}
            style={{ fontWeight: '400', fontSize: 19, top: 9 }}>Search Your notes </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '30%', backgroundColor: 'white', justifyContent: 'flex-end', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{ position: 'relative', height: 'auto', width: 'auto',marginRight:6 }}
              onPress={ ()=>{
                this.setState({ listView: !this.state.listView },()=>{console.log("AppBar:"+this.state.listView);
                this.props.handleListView(this.state.listView)});
                }}>
              <Image source={(this.state.listView) ? require('../Image/List4.png') : require('../Image/Grid2.png')}
                style={{ top: 0, width: 25, height: 25, margin: 10 }} />
            </TouchableOpacity>
            <Avatar.Text size={40}
              style={{  backgroundColor: 'lightblue', marginRight:5}} label="M" />
          </View>

        </View>
      </Appbar>

      
    );
  }
}

