import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import { RadioButton, } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
const currentDate = new Date().getDate();
const currentTime = new Date().getHours()
export default class DialogReminderr extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogVisible: false,
      date: "",
      time: "",

    };
  }

  render() {
    return (

      <Dialog.Container visible={this.props.dialogVisible}>
        <Dialog.Title>Add Reminder</Dialog.Title>
        <View style={{ margin: 4, alignSelf: 'center' }}>
          <DatePicker
            mode='date'
            style={{ width: 200 }}
            androidMode='spinner'
            onDateChange={(date) => { this.setState({ date: date }) }}
            date={this.state.date}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 2,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
          />
        </View>
        <View style={{ margin: 8, alignSelf: 'center' }}>
          <DatePicker
            mode='time'
            style={{ width: 200 }}
            androidMode='spinner'
            is24Hour={false}
            format='LT'
            onDateChange={(time) => { this.setState({ time: time })}}
            time={this.state.time}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 2,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', top: 10 ,justifyContent:'flex-end'}}>
          <Dialog.Button label="Save" onPress={()=>this.props.handleSave(this.state.date,this.state.time)} />
          <Dialog.Button label="Cancle" onPress={this.props.handleCancel} />
        </View>

      </Dialog.Container>

    );
  }
}