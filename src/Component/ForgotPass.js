import React, { Component } from "react";
import { View, TouchableOpacity, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput } from "react-native";
import firebase from '../fireBase/Config'

export default class Login extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "FunDoo",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { textAlign: "left", flex: 1 }
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
        this.passwordReset = this.passwordReset.bind(this);
    }

    passwordReset = (email) => {
        return firebase.auth().sendPasswordResetEmail(this.state.email)
    }

    render() {
        return (
            <View style={styles.innerView}>
                <Text style={styles.TitleText}>
                    Account Recovery
                </Text>
                
                <View style={styles.deepView}>
                <ScrollView style={{height:'100%',width:'100%'}}>

                    <View style={{ top: 20, alignItems: "center", paddingBottom: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Forgot your Password?
                        </Text>
                    </View>

                    <Text style={{ paddingTop: 5, paddingHorizontal: 25, fontSize: 15 }}>
                        Enter the e-mail address you use and
                        you will receive an e-mail contaning a
                        link for changing your password. 
                    </Text>

                    <TextInput style={styles.longInput}
                        placeholder="Email address"
                        onChangeText={(text) => this.setState({ email: text })}/>
                   
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={this.passwordReset}>
                        <Text style={styles.sendButtonText}> Send </Text>
                    </TouchableOpacity>
                    </ScrollView>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: "#daebf4",
    },
    innerView: {
        flex: 1,
        height: '90%',
        alignSelf: 'center',
        backgroundColor: "white",
        width:'auto'
    },
    TitleText: {
        width: '90%',
        display: 'flex',
        alignSelf: "center",
        marginHorizontal: 10,
        marginVertical: 20,
        fontSize: 25,
        fontWeight: "bold",
        color: '#0693e9'
    },
    deepView: {
        width: '90%',
        height: '72%',
        display: 'flex',
        backgroundColor: "#f4f7fa",

    },
    sendButton: {
        top: 25,
        alignSelf: "center",
        backgroundColor: '#7a42f4',
        margin: 25,
        height: 40,
        width: 180,
        fontSize: 30,
    },
    sendButtonText: {
        color: 'white',
        padding: 10,
        alignSelf: "center"
    },
    longInput: {
        top: 20,
        height: 40,
        width: 280,
        borderColor: '#7a42f4',
        backgroundColor: "white",
        alignSelf: "center",
        borderWidth: 1,
    },
})