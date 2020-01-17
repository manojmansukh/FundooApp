import * as React from 'react';
import { Appbar, Provider,Menu, } from 'react-native-paper';
import { StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import firebase from '../fireBase/Config'
import DialogReminder from './DialogReminder'
import moment from 'moment';
import ColorPalette from 'react-native-color-palette'
import {saveNote } from '../fireBase/FireBaseDb'


export default class CreateNotes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      note: '',
      title: '',
      time: null,
      date: null,
      dialogVisible: false,
      reminder: false,
      pin: false,
      archive: false,
      trash: false,
      bgColor:'#FFFF',
      visible: false,
      currentTime: '',

    }
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  showDialog = () => {
    console.log('mj');
    this.setState({ dialogVisible: true }, () => {
      console.log('Hiii' + this.state.dialogVisible);
    });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  setDate = () => {
    var time1 =
      this.setState({ date: false });
  };

  setTime = () => {
    this.setState({ date: false });
  };

  handleSave = (date, time) => {
    console.log("dateTime:");
    console.log(date, time)
    this.setState({ date: date }, () => { console.log("Date:" + this.state.date); })
    this.setState({ time: time }, () => { console.log("Time:" + this.state.time); })
    this.setState({ dialogVisible: false }, () => {
    });
  };

  handleSaveNote = () => {
    if (this.state.note == '' && this.state.title == '') {
      console.log("blanck");
      this.props.navigation.navigate('Notes')
    }
    else {
      saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor)
    }
  }
  componentDidMount(){
    var date = moment()
    .utcOffset('+05:30')
    .format(' hh:mm A');
    this.setState({
      currentTime: date
    })
  }
  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Appbar style={styles.top}>
          <Appbar.Action icon={require('../Image/BackArrow.png')}
            onPress={() => {this.handleSaveNote()
              this.props.navigation.navigate('Notes')}} />

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
            <Appbar.Action icon={this.state.pin ? require('../Image/pin.png') : require('../Image/unpin.png')}
              onPress={() => this.setState({ pin: !this.state.pin }, () => { console.log("manoj" + this.state.pin) })} />
            <Appbar.Action icon={require('../Image/bell1.png')}onPress={this.showDialog} />
            <Appbar.Action icon={this.state.archive ? require('../Image/Archive.png') : require('../Image/Unarchive.png')}
              onPress={() => this.setState({ archive: !this.state.archive })} />
          </View>
        </Appbar>
        
        <View style={{height:'83%',width:'100%',backgroundColor:this.state.bgColor}}>
        <TextInput multiline={true}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Title"
          onChangeText={(text) => this.setState({ title: text })} />

        <TextInput multiline={true}
          style={{ marginLeft: 20, fontSize: 15 }}
          underlineColorAndroid="transparent"
          placeholder="Note"
          onChangeText={(text) => this.setState({ note: text })} />

        <DialogReminder dialogVisible={this.state.dialogVisible}
          handleCancel={this.handleCancel}
          handleSave={this.handleSave}/>
         </View>
         <Provider>

<View style={{ flex: 1, width: '100%', position: 'relative' }}>
  {/* <BottomBar/> */}
  <Appbar.Header style={{ backgroundColor: 'white', justifyContent: 'space-between' }}>
    <Appbar.Action icon={require('../Image/AddBox.png')} onPress={this._handleMore} />
    <Text>Edited {this.state.currentTime}</Text>
    <Menu
      visible={this.state.visible}
      onDismiss={this._closeMenu}
      style={{  }}
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
        onChange={color => this.setState({bgColor:color})}
        defaultColor={'#ffff'}
        colors={['#ffff', '#ffeb3b', '#f44336', '#74FF3B', '#9B59B6', '#00FFF5', '#2980B9', '#E74C3C']}
      />
    </Menu>
  </Appbar.Header>
</View>
</Provider>
         
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: 'white',
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: .1,
  },
  input: {
    marginTop: 10,
    width: '90%',
    height: 70,
    alignSelf: "center",
    borderBottomColor: 'black',
    fontSize: 30,
    //Horizontal:50
  },
});