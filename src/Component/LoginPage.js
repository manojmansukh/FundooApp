import React, { Component } from "react";
import { View, TouchableOpacity, Text, Switch, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput } from "react-native";
import firebase from '../fireBase/Config'
import { onSignIn } from "./Authentication";
import { SetCurrentUser} from "./Authentication";
import { AsyncStorage } from "react-native";
import { LoginManager } from 'react-native-fbsdk';
import { getUserId} from '../Services/FireBaseDb'

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Fundoo',
    headerStyle: {
      backgroundColor: '#1e86c7',
    },
    headerTintColor: '#fff',
  })
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passError: null,
      showPassword: true,
      hidePassword: true,
    }
  }
 
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  validateEmail = (text) => {
    console.log(text);
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.test(text) === false) {
      this.setState({ emailError: 'Email is Not Correct' });
      return false;
    }
    else {
      //email correct
      this.setState({ email: text })
      this.setState({ emailError: null });
    }
  }

  validatePass = (text) => {
    console.log(text);
    let pass = /^[#\w@_-]{8,20}$/
    if (pass.test(text) === false) {
      this.setState({ passError: 'enter valid pass' });
      this.setState({ password: text })
      return false;
    }
    else {
      //email correct
      this.setState({ password: text })
      this.setState({ passError: null });
    }
  }

  handleLogin = () => {
     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() =>{
                   onSignIn();
                  AsyncStorage.setItem("UserId",firebase.auth().currentUser.uid).then(getUserId())
                //  getUserId();
                  this.props.navigation.navigate('Drawer')
      })
      .catch((error) => {
        alert("Enter the valid Details...!", error)
        var errorCode = error.code;
        var errorMessage = error.errorMessage;
        console.log('Error code :' + errorCode);
        console.log('Error Msg :' + errorMessage);
      });
  }

  // async hadleFaceBookLogin =() => {
  //   try {
  //     let result = await LoginManager.logInWithPermissions([public_profile])
  //     if (result.isCancelled) {
  //       alert('loin was cancelled');
  //     }
  //     else{
  //       alert('Login with successful with permissdion :' 
  //       +result.grantedPermissions.toString());
  //     }
      
  //   } catch (error) {
  //     alert('login failed with error'+error)
  //   }
  // }
  render() {
    return (
      
      <KeyboardAvoidingView style={styles.innerView}>
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', alignItems: 'center',top:-5 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../Image/Logo.png')}
                style={{ width: 300, height:200,top:30,tintColor:'#1e59c7' }} 
                resizeMode='contain'
                />
                <View style={{flexDirection:'row',alignItems:'flex-start',top:10,}}>
                <View ><Text style={{color: '#4285F4',fontSize:60,fontWeight:'bold',}}>F</Text></View>
                <View><Text style={{color: '#DB4437',fontSize:60,fontWeight:'bold'}}>u</Text></View>
                <View ><Text style={{color: '#F4B400',fontSize:60,fontWeight:'bold'}}>n</Text></View>
                <View ><Text style={{color: '#4285F4',fontSize:60,fontWeight:'bold'}}>D</Text></View>
                <View ><Text style={{color: '#0F9D58',fontSize:60,fontWeight:'bold'}}>o</Text></View>
                <View ><Text style={{color: '#DB4437',fontSize:60,fontWeight:'bold'}}>o</Text></View>
                </View>

              <Text style={styles.loginText}>
                Login
            </Text>
            </View>

            <View>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => this.validateEmail(text)} />
              <Text style={styles.error}>{this.state.emailError}</Text>

              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={this.state.hidePassword}
                onChangeText={(password) => this.setState({ password })}
                onChangeText={(text) => this.validatePass(text)} />
              <Text style={styles.error}>{this.state.passError}</Text>

              <View>
              <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                <Image source={(this.state.hidePassword) ? require('../Image/hide.png') : require('../Image/show.png')} style={styles.btnImage} />
              </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.handleLogin}>
                <Text style={styles.submitButtonText}> Login </Text>
              </TouchableOpacity>
              
              <View style={{justifyContent : 'center',alignItems :'center',top:-9}}>
              <Text style={{fontWeight:'bold'}}>OR</Text>
              </View>
             
              <TouchableOpacity
                // style={styles.fbButton}
                onPress={this.hadleFaceBookLogin}>
                 <Image source={require('../Image/FbLogin.png')}
                 style={{height:40,width:300,margin:15,borderColor:'black',borderWidth:.15,top:-15}}/> 
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPass') }}>
                <Text style={styles.text}>
                  Forgot Password?
              </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                <Text style={styles.text}>
                  Sign UP
              </Text>
              </TouchableOpacity>

              
            </View>

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
  input: {
   
    marginTop: 10,
    width: '90%',
    height: 40,
    borderColor: '#314bb0',
    alignSelf: "center",
    borderWidth: 1
  },
  loginText: {
    display: 'flex',
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    top:-2
  },
  submitButton: {
    top:-2,
    alignSelf: "center",
    backgroundColor: '#1e86c7',
    margin: 15,
    height: 40,
    width: 300,
    fontSize: 50,
  },
  fbButton: {
    top:-15,
    alignSelf: "center",
    backgroundColor: '#3f51b5',
    margin: 15,
    height: 40,
    width: 300,
    fontSize: 50,
  },
  submitButtonText: {
    color: 'white',
    padding: 10,
    alignSelf: "center",
    fontSize:15
  },
  text: {
    top:-15,
    flexDirection: "row",
    fontSize: 15,
    alignSelf: "center",
  },
  error: {
    color: 'red',
    width: '90%',
    marginTop: 1,
    marginHorizontal: 30,
    flexDirection: "row",
    fontSize: 11,
  },
  visibilityBtn:
  {
    position: 'absolute',
    right: 20,
    height: 190,
    bottom:-55,
    width: 35,
    padding: 5
  },
 
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});