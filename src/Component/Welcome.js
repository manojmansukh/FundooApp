import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
export default class Welcome extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "FunDoo",
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { textAlign: "left", flex: 1 }
        };
    };
    // componentDidMount(){
    //     this.props.navigation.navigate('DashBoard')
    // }
    render() {
        return (
            <View style={styles.innerView}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../Image/fundoo6.jpg')} />

            </View>
        );
    }
}
const styles = StyleSheet.create({
   
    innerView: {
        flex: 1,
        width: '100%',
        backgroundColor: "white",
    },
})