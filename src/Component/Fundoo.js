import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class Fundoo extends Component{
    render(){
        return(
            <View style={{ flex:1,flexDirection:'row'}}>
                <View style={{color: '#4285F4'}}>F</View>
                <View style={{color: '#DB4437'}}>U</View>
                <View style={{color: '#F4B400'}}>N</View>
                <View style={{color: '#4285F4'}}>D</View>
                <View style={{color: '#0F9D58'}}>O</View>
                <View style={{color: '#DB4437'}}>O</View>
            </View>
        );
    }
}
