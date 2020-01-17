import { AsyncStorage } from "react-native";
import firebase from '../fireBase/Config'

//var currentUser = firebase.auth().currentUser.uid

export const USER_KEY = "isauthenticated";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const SetCurrentUser = () => AsyncStorage.setItem("UserId",firebase.auth().currentUser.uid)

export const removeCurrentUser = () => AsyncStorage.removeItem("UserId");


export const isSignedIn = () => {
    
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        console.log(res);
        
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};