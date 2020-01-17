import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, FAB, Portal, Provider , Menu} from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'

export default class BottomBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bgColor:'',
      visible: false,
    }
  }
  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <Provider>
      <Appbar.Header style={{ backgroundColor: 'white', justifyContent: 'space-between' }}>
      <Appbar.Action icon={require('../Image/AddBox.png')} onPress={this._handleMore} />
      <Text>Edited {this.state.currentTime}</Text>
      <Menu
        visible={this.state.visible}
        onDismiss={this._closeMenu}
        style={{ width: '97%' }}
        anchor={
          <Appbar.Action icon="dots-vertical" onPress={this._openMenu} />}>
        <Menu.Item icon={require('../Image/Deleted.png')}
          onPress={() => { console.log("item1"); }} title="Delete" />
        <Menu.Item icon={require('../Image/Copy.png')}
          onPress={() => { console.log("item2"); }} title="Make a Copy" />
        <Menu.Item icon={require('../Image/Send.png')}
          onPress={() => { console.log("item3"); }} title="Send" />
        <Menu.Item icon={require('../Image/Collaborator.png')}
          onPress={() => { console.log("item3"); }} title="Collaborator" />
        <Menu.Item icon={require('../Image/Label.png')}
          onPress={() => { console.log("item3"); }} title="Labels" />
        <ColorPalette
        title = ''
          onChange={color => this.setState({bgColor:color}, () => {this.props.handleBgColour(this.state.bgColor)})}
          defaultColor={'#ffff'}
          colors={['#ffff', '#ffeb3b', '#f44336', '#74FF3B', '#9B59B6', '#00FFF5', '#2980B9', '#E74C3C']}
        />
      </Menu>
    </Appbar.Header>
    </Provider>
    );
  }
}

