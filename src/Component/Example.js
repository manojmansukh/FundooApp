import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator,FlatList, TouchableOpacity } from 'react-native';

export default class Example extends Component {
        
        constructor(props) {
         super(props);
         this.state = {
           
           dataSource:[1,2,3,4]
          };
        }
        
render() {
    
    return (
        <View style={styles.container}>
            <FlatList
                data={this.state.dataSource}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                <View>
                <Text>{item}</Text>
                </View>
            }
            />
        </View>
    );
}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    item: {
        backgroundColor: '#0001',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,

    },
    title: {
        fontSize: 32,
    },

});