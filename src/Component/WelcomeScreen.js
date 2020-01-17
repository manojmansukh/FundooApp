import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';  
//import Icon from 'react-native-vector-icons/Ionicons';  

export default class WelcomeScreen extends Component {  
    static navigationOptions = {  
         title: 'Welcome',  
         
    };  
    render() {  
        return (  
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text>WelcomeScreen</Text>  
                <Button  
                    title="Go to DashboardScreen"  
                    onPress={() => this.props.navigation.navigate('Dashboard')}  
                />  
            </View>  
        );  
    }  
}  