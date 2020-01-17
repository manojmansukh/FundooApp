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

        <Dialog
                    visible = {this.props.showDialogBox}
                    onDismiss = {this.props.dismissDialogBox}
                    style = {{width:'auto',height:'auto'}}
                    >
                        <Dialog.Content style = {styles.accountDetails}>
                            <Avatar.Text size = {35} label={this.props.avatarFirstLetter}/>
                            <Paragraph>{this.props.name}</Paragraph>
                           
                        </Dialog.Content>
                        <Dialog.Actions style={{display:'flex',justifyContent:"space-between"}}>
                        <Button onPress={this.props.dismissDialogBox}>Cancel</Button>
                            <Button onPress={this.handleLogout}>LogOut</Button>
                        </Dialog.Actions>
                    </Dialog>

    );
  }
}