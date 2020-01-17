import React, { Component } from "react";
import { View, TouchableOpacity, Image, Switch, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput } from "react-native";
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            Confirmpassword: '',
            hidePassword: true,
            hideConfirmPassword: true,

        }
        this.handleSumbit = this.handleSumbit.bind(this);
    }
    managePasswordVisibility = () => {
        console.log("hoii");

        this.setState({ hidePassword: !this.state.hidePassword });
    }

    manageConfirmPasswordVisibility = () => {
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
    }

    validateText = (text, field) => {
        var name = /^[a-z\d]{2,12}$/i;
        if (name.test(text) === false) {
            if (field === 'firstName') {
                this.setState({ firstNameError: 'Required and must be of length 2 to 12.' });
            }
            if (field === 'lastName') {
                this.setState({ lastNameError: 'Required and must be of length 2 to 12.' });
            }
            return false;
        }
        else {
            this.setState({ [field]: text })
            this.setState({ lastNameError: null });
            this.setState({ firstNameError: null });
        }
    }

    validateEmail = (text) => {
        console.log(text);
        let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.test(text) === false) {
            this.setState({ emailError: 'Required and Must be a valid email' });
            return false;
        }
        else {
            //email correct
            this.setState({ email: text })
            this.setState({ emailError: null });
        }
    }

    validatePassword = (text) => {
        console.log(text);
        let pass = /^[#\w@_-]{8,20}$/
        if (pass.test(text) === false) {
            this.setState({ password: text })
            this.setState({ passwordError: 'enter valid password.' });
            return false;
        }
        else {
            //email correct
            this.setState({ password: text })
            this.setState({ passwordError: null });
        }
    }

    validateConfirmPassword = (text) => {
        if (this.state.password === text) {
            this.setState({ Confirmpassword: text })
            this.setState({ confirmPasswordError: null });
        }
        else {
            this.setState({ Confirmpassword: text })
            this.setState({ confirmPasswordError: 'Password not match' });
            return false;
        }
    }

    handleSumbit = () => {
        if (this.state.firstNameError == null && this.state.lastNameError == null && this.state.emailError == null && this.state.passwordError == null && this.state.confirmPasswordError == null) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((succes) =>{
              console.log("hiii");
              console.log(JSON.stringify(succes));  
                firebase.database().ref('/users/'+succes.user.uid+'/personal').set({
                    firstName: this.state.firstName,
                    lastNamae: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    Confirmpassword: this.state.Confirmpassword
                })
                alert("Registration Complete Succesfully...!")
                this.props.navigation.navigate('SignIn')
            })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.errorMessage;
                    console.log('Error code :' + errorCode);
                    console.log('Error Msg :' + errorMessage);
                });
        }
        else {
            alert("Enter the valid Details...!")
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.innerView}>
                <ScrollView style={{ width: '100%', height: '100%' }}>

                    <Text style={styles.TitleText}>
                        Create Your FunDoo Account
                    </Text>

                    <TextInput style={styles.input}
                        placeholder="First Name"
                        onChangeText={(text) => this.validateText(text, 'firstName')} />
                    <Text style={styles.error}>{this.state.firstNameError}</Text>

                    <TextInput style={styles.input}
                        placeholder="Last Name"
                        onChangeText={(text) => this.validateText(text, 'lastName')} />
                    <Text style={styles.error}>{this.state.lastNameError}</Text>

                    <TextInput style={styles.input}
                        placeholder="Email-Address"
                        autoCapitalize="none"
                        onChangeText={(text) => this.validateEmail(text)} />
                    <Text style={styles.error}>{this.state.emailError}</Text>

                    <Text style={styles.text}>
                        You can use letters, numbers & Periods
                    </Text>

                    <View style={styles.deepView}>
                        <TextInput style={styles.shortInput}
                            placeholder="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={(text) => this.validatePassword(text)} />

                        <TextInput style={styles.shortInput}
                            placeholder="Confirm Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={(text) => this.validateConfirmPassword(text)} />

                        <TouchableOpacity activeOpacity={0.8} style={{ position: 'relative', top: 20, height: 23, width: 25 }} onPress={this.managePasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../Image/hide.png') : require('../Image/show.png')} style={{ height: '100%', width: '100%', resizeMode: 'center' }} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ display: 'flex', flexDirection: "row", }}>
                        <Text style={styles.errorPassword}>{this.state.passwordError}</Text>
                        <Text style={styles.errorPassword}>{this.state.confirmPasswordError}</Text>
                    </View>

                    <Text style={{ width: '90%', marginBottom: 20, alignSelf: 'center' }}>
                        Use 8 or more character with a mix of letters, number and Symbols.
                    </Text>

                    <View style={styles.deepView}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => { this.handleSumbit(); }}>
                            <Text style={styles.submitButtonText}> Register </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                this.props.navigation.navigate('SignIn')
                            }}>
                            <Text style={styles.submitButtonText}> Login </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#daebf4",
    },
    innerView: {
        flex: 1,
        width: '100%',
        backgroundColor: "white",
    },
    TitleText: {
        display: 'flex',
        alignSelf: "center",
        width: '90%',
        marginTop: 20,
        marginBottom: 60,
        fontSize: 30,
        fontWeight: "bold",
    },
    deepView: {
        display: 'flex',
        flexDirection: "row",
        alignSelf: 'center',
    },
    input: {
        width: '90%',
        height: '8%',
        borderColor: '#FF9800',
        alignSelf: "center",
        borderWidth: .7

    },
    text: {
        marginTop: -3,
        width: '90%',
        alignSelf: 'center'
    },
    shortInput: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginHorizontal: 10,
        width: '38%',
        height: '70%',
        borderColor: '#FF9800',
        borderWidth: .7,
    },
    longInput: {
        backgroundColor: 'red',
        top: 5,
        height: 40,
        width: 339,
        borderColor: '#FF9800',
        alignSelf: "center",
        borderWidth: 1,
    },
    submitButton: {
        alignSelf: "center",
        backgroundColor: '#FF9800',
        margin: 10,
        height: 40,
        width: '40%',
        fontSize: 30,
    },
    submitButtonText: {
        color: 'white',
        padding: 10,
        alignSelf: "center"
    },
    error: {
        color: 'red',
        width: '90%',
        marginTop: 1,
        marginHorizontal: 30,
        flexDirection: "row",
        fontSize: 11,
    },
    errorPassword: {
        color: 'red',
        width: '35%',
        marginTop: -6,
        marginHorizontal: 30,
        flexDirection: "row",
        fontSize: 11,
    },
    //     btnImage:
    //   {
    //     resizeMode: 'contain',
    //     height: '5%',
    //     width: '5%'
    //   },
    //   visibilityBtn:
    //   {
    //     position: 'relative',
    //     //right: 20,
    //     //height: 190,
    //     //width: 35,
    //     padding: 5
    //   },
});