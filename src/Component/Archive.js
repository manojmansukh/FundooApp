import * as React from 'react';
import { Appbar, Card } from 'react-native-paper';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity, } from 'react-native';
import { View } from 'native-base';
import firebase from '../fireBase/Config'
import { AsyncStorage } from "react-native";
import {  Provider, Menu, Divider, Snackbar } from 'react-native-paper';
export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      toggleDrawer: true,
      dataSource: [],
      numColumns: 1,
      listView: true,
      selectionMode: false,
      selectedData: [],
      permantDelete: false,
      visible: false,
      snakBarvisible: false,
      archive : true,
      noteId : ''

    };
  }
  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });


  toggleDrawer() {
    //console.log(this.props);
    this.props.navigation.toggleDrawer()
  };
  GridView = () => {
    this.setState({ ListView: !this.state.ListView });
  }

  handleSelectionMode = (mode) => {
    console.log("selectionModde", mode);
    this.setState({ selectionMode: mode })
    this.setState({ selectedData: [] })
  }

  handleRestore =(status) => {
    this.setState({trash : status},() =>{
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId =>(
        firebase.database().ref('/users/' + currentUser + '/Notes/'+currentNoteId).update({
          Trash: this.state.trash,
         })
      ))
      })
  }
  handlePermantDelete = (status) => {
    this.setState({ permantDelete: status }, () => {
      console.log("delete status:",this.state.permantDelete);
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
        firebase.database().ref('/users/' + currentUser + '/Notes/' + currentNoteId).remove()
      ))
    })
  }

  handleListView = (listView) => {
    this.setState({ listView: listView }, () => {
      if (listView == true) {
        return this.setState({ numColumns: 1 })
      }
      this.setState({ numColumns: 2 })
    }
    )
  }

  handlerLongClick = (noteId) => {
    console.log(noteId);
    this.setState({ selectionMode: true },()=>{console.log(this.state.selectionMode);
    })
    this.handleSelectionNode(noteId)
  };

  handleSelectionNode = (noteId) => {
    if (this.state.selectedData.includes(noteId)) {
      var selectedNode = this.state.selectedData.filter(element => element !== noteId)
      this.setState({ selectedData: selectedNode }, () => {
        if (this.state.selectedData.length == 0) {
          console.log("hiiiii mj");
          this.setState({ selectionMode: false })
        }
      })
    }
    else {
      var selectedNode = this.state.selectedData.concat(noteId)
      this.setState({ selectedData: selectedNode })
    }
  }

  handleArchive =() => {
    console.log("Hiii Trash");
    
    this.setState({archive : false},() =>{
      console.log(this.state.archive);
      var currentUser = firebase.auth().currentUser.uid
      console.log(this.state.noteId);
        firebase.database().ref('/users/' + currentUser + '/Notes/'+this.state.noteId).update({
          Archive: this.state.archive,
         })
     
      })
  }

  componentDidMount() {
    console.log("hii");
    AsyncStorage.getItem("UserId", (error, result) => {
      var ref = firebase.database().ref('/users/' + result + '/Notes/').orderByChild('Archive').equalTo(true)
      ref.on('value', (snapshot) => {
        console.log('userIddd:' + result);
        var data = snapshot.val();
        console.log("delete", data);
        {
          data !== null ?
          this.setState({
            dataSource: data,
            listView: true,
          }, () => {
            console.log('mmmm',this.state.dataSource);
            Object.keys(this.state.dataSource).map((key) => {
              var Key = key
              var data = this.state.dataSource[key]
               this.state.dataSource[key].noteId = key
            })
          })
          :null
        }
        
      });
    })
  }
 
  render() {
    return (

      <View style={{ flex: 1, width: '100%', height: "100%" }}>
         <Snackbar visible={this.state.snakBarvisible}
        duration={3000}
        onDismiss={() => this.setState({ snakBarvisible: false })}
        style={{backgroundColor :'#020202'}}
        action={{
          label: 'Restore',
          onPress: () => {
            this.handleArchive();
          },
        }}
        >
          Can't edit in Archive
        </Snackbar>
        <Appbar style={{ backgroundColor: 'white' }} >
          <View style={{ flexDirection: 'row', width: '100%' }}>

            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image source={require('../Image/drawer.png')}
                style={{ width: 25, height: 25, margin: 10, tintColor: 'black' }} />
            </TouchableOpacity>

            <Provider>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity style={{ position: 'relative', height: 'auto', width: 'auto', marginRight: 6 }}
                onPress={() => {
                  this.setState({ ListView: !this.state.ListView }, () => {
                  console.log("AppBar:" + this.state.ListView);
                  this.handleListView(this.state.ListView)
                  });
                }}>
                  <Image source={(this.state.ListView) ? require('../Image/List4.png') : require('../Image/Grid2.png')}
                  style={{ top: 0, width: 25, height: 25, margin: 10 }} />
              </TouchableOpacity>

                <Menu
                  visible={this.state.visible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <Appbar.Action icon={require('../Image/More.png')} onPress={this._openMenu} />
                  }>

                  <Menu.Item onPress={() => {
                    this.setState({ permanantDelete: true }, () => {
                    this.handlePermantDelete(this.state.permanantDelete)
                    })
                  }} title="Permanant Delete" />

                  <Divider/>

                  <Menu.Item onPress={() => {
                    this.setState({ trash: false }, () => {
                      this.handleRestore(this.state.trash)
                    })
                  }} title="Restore" />
                </Menu>

            </View>
            </Provider>
          </View>
        </Appbar>

        <View style={{ width: '100%', display: 'flex', height: '84%', backgroundColor: 'white' }}>

            <FlatList
              numColumns={this.state.numColumns} //toggle no of columns
              key={this.state.numColumns}
              data={Object.keys(this.state.dataSource)}
              renderItem={({ item }) =>

                <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                  onLongPress={() => this.handlerLongClick(this.state.dataSource[item].noteId)}
                  onPress={() => this.state.selectionMode ? this.handleSelectionNode(this.state.dataSource[item].noteId)
                                 :  this.setState({snakBarvisible : true, noteId : this.state.dataSource[item].noteId })}
                >
                  <View style={{ width: '100%', position: "relative", borderColor: '#DDE6E2', borderRadius:7, borderWidth: 1, display: 'flex',
                   backgroundColor: this.state.selectionMode && this.state.selectedData.includes(this.state.dataSource[item].noteId) ? '#e0ffff' : 'white', }}>
                    <View>
                      <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{"Title :"}</Text>
                      <Text style={styles.subText}>{this.state.dataSource[item].Title}</Text>
                      <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{"Note :"}</Text>
                      <Text style={styles.subText}>{this.state.dataSource[item].Note}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
           
        </View>
      </View>




    );
  }
}

const styles = StyleSheet.create({
  innerView: {
    display: 'flex',
    width: '100%',
    height: '90%',
    //backgroundColor:'red'
  },
  subView: {
    width: '100%',
    position: "relative",
    borderColor: 'pink',
    borderWidth: 1,
    backgroundColor: 'white',
    display: 'flex',
    // margin: 15
  },
  horizontalView: {
    //width:'30%',
    //position:"relative",
    borderColor: 'pink',
    borderWidth: 1,
    backgroundColor: 'red',
    display: 'flex',
    // margin: 15
  },
  subText: {
    marginLeft: 20
  },
  
  bottom: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: .1,
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ListStyle: {
    flex: 1,
    marginVertical: 20,
  },
});