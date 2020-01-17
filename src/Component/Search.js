import * as React from 'react';
import { StyleSheet, Image, FlatList, Text, ScrollView, TouchableHighlight, ActivityIndicator, TouchableOpacity, Title } from 'react-native';
import { View } from 'native-base';
import firebase from '../fireBase/Config'
import { AsyncStorage } from "react-native";
import { Avatar, Chip, Snackbar } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: null,
            dataSource: [],
            search: '',
            arrayholder : [],
        };
        
    }
    searchFilterFunction = text => {
        
        this.setState({
            value: text,
        });
        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.Title.toUpperCase()} ${item.Note.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
        });
    };

    componentDidMount() {
        console.log("search");
        AsyncStorage.getItem("UserId", (error, result) => {
            // .orderByChild('Archive').equalTo(false)
            firebase.database().ref('/users/' + result + '/Notes/')
                .on('value', (snapshot) => {
                    console.log('userIddd:' + result);
                    var data = snapshot.val();
                    console.log("mjjjjjjjjjj", data);
                    this.setState({
                        dataSource: data,
                        listView: true,
                    }
                        , () => {
                            var arrayholder = [];
                            this.state.dataSource !== null ?
                             Object.keys(this.state.dataSource).map(async(key) => {
                                    var Key = key
                                    var data = this.state.dataSource[key]
                                    console.log('mjData',data);
                                    this.state.dataSource[key].noteId=key
                                    arrayholder.push(this.state.dataSource[key])
                                await this.setState({arrayholder : arrayholder})
                                console.log('state',this.state.arrayholder);
                                })
                                : null   
                        }
                    )
                });
        })
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%', height: "100%" }}>

                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
                    round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                    value={this.state.value}
                />
                <FlatList
                    data={Object.keys(this.state.dataSource)}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                            onPress={() => this.props.navigation.navigate('EditNote', { 'inform': this.state.dataSource[item], "currentNoteId": this.state.dataSource[item].noteId })} a >
                            <View style={{ backgroundColor: this.state.dataSource[item].BgColor, paddingTop: 10, paddingBottom: 10, width: '100%', position: "relative", borderRadius: 7, borderWidth: 1, display: 'flex', }}>
                                <View>
                                    <Text style={styles.subText}>{this.state.dataSource[item].Title}</Text>
                                    <Text style={styles.subText}>{this.state.dataSource[item].Note}</Text>
                                    {
                                        this.state.dataSource[item].Date !== undefined && this.state.dataSource[item].Time !== undefined ?
                                            <Chip icon="alarm" style={{ bottom: 17, width: 175, marginLeft: 6 }}>{this.state.dataSource[item].Date}{'  '}{this.state.dataSource[item].Time}</Chip>
                                            : null
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subText: {
        marginLeft: 20
    },
});