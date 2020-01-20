import * as React from 'react';
import firebase from '../fireBase/Config'
import axios from'axios'
import moment from 'moment';
import { Appbar } from 'react-native-paper';
import { View } from 'native-base';
import { AsyncStorage } from "react-native";
import AppBar1 from './AppBar1'
import { Chip, } from 'react-native-paper';
import AppBarSelectedNotes from './AppBarSelectedNotes'
import PushNotification from "react-native-push-notification"
import { StyleSheet, Image, FlatList, Text, ScrollView, TouchableOpacity, } from 'react-native';
//import { getNotes, setPin, setArchive, setTrash, PermanentDelete} from '../Services/FireBaseDb';
 import { getNotes, setPin, setArchive, setTrash, } from '../Services/AxiosDb'
var dateTime,note,title,systemTime;

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      toggleDrawer: true,
      dataSource: [],
      pinData: [],
      unPinData: [],
      numColumns: 1,
      listView: true,
      selectionMode: false,
      selectedData: [],
      permantDelete: false,
      visibl: false,
      currentTime: '',
      date:'',
      time:'',
      nameList:'',
      users: []
    };

  }

showNotification = (dateTime,note,title) =>{
  console.log('Datenotification',dateTime)
  console.log('Note',note);
  console.log('Title',title);
  console.log('currentTime',this.state.currentTime)
  console.log('dateTime',dateTime)
  if(this.state.currentTime === dateTime ){
    console.log("mjjjj");
    
    PushNotification.localNotification({
      title : title,
      message : note,
      color : 'white',
      vibrate : true,
    })
  }

}


  handleSelectionMode = (mode) => {
    console.log("selectionModde", mode);
    this.setState({ selectionMode: mode })
    this.setState({ selectedData: [] })
  }

  //selected node operation.

  handlePinStatus = (status) => {
    this.setState({ pin: status }, () => {
      this.state.selectedData.map(currentNoteId => (
        //firebase Method
        setPin(currentNoteId,this.state.pin)
      ))
    })
  }

  handleArchive = (status) => {
    this.setState({ archive: status }, () => {
      this.state.selectedData.map(currentNoteId => (
        //firebase Method
        setArchive(currentNoteId, this.state.archive)
      ))
    })
  }

  handleTrash = (status) => {
    this.setState({ trash: status }, () => {
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
         //firebase Method
         setTrash(currentNoteId, this.state.trash)
      ))
    })
  }

  handlePermantDelete = (status) => {
    this.setState({ permantDelete: status }, () => {
      console.log(this.state.permantDelete);
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
        PermanentDelete(currentNoteId)
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
    this.setState({ selectionMode: true })

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

    //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

  

  async componentDidMount() {
    // this.checkPermission();
    // this.createNotificationListeners();
    const nameList = ''

   //getNotes1();

    this.showNotification(dateTime,note,title)
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD LT');

    this.setState({
      currentTime: date
    }, () =>{console.log('currentTime:',this.state.currentTime);
    }
    );
    
    //firebase method & Axios method

    getNotes((snapshotValue) => {
      this.setState({
        dataSource: snapshotValue,
        listView: true,
      }, () => {
        console.log('filter', this.state.dataSource );
        
        var pinData = []
        var unPinData = []
        this.state.dataSource !== null ?
          Object.keys(this.state.dataSource).map((key) => {
            var Key = key
            var data = this.state.dataSource[key]

            if (this.state.dataSource[key].Pin == true && this.state.dataSource[key].Trash == false) {
              this.state.dataSource[key].noteId = key
              pinData.push(this.state.dataSource[key])
            }
            else if(this.state.dataSource[key].Pin == false && this.state.dataSource[key].Trash == false) {
              this.state.dataSource[key].noteId = key
              unPinData.push(this.state.dataSource[key])
            }
            this.setState({
              pinData: pinData,
              unPinData: unPinData,
            })
          })
          : null
      })
    })
  }

  // componentWillUnmount() {
  //   this.notificationListener();
  //   this.notificationOpenedListener();
  // }

  render() {
   // console.log("MAnojREnder<<<<<<<<<<<<<<<<<<",this.state.nameList);
    
    return (
      <View style={{ flex: 1, width: '100%', height: "100%" }}>
        <View style={{height:'12%',}}>
        {
          this.state.selectionMode ?
            <AppBarSelectedNotes
              handleSelectionMode={this.handleSelectionMode}
              handlePinStatus={this.handlePinStatus}
              handleArchive={this.handleArchive}
              handlePermantDelete={this.handlePermantDelete}
              handleTrash={this.handleTrash}
            />
            : <AppBar1 navigation={this.props.navigation} handleListView={this.handleListView} />

        }
        </View>
        <View style={{ width: '100%', display: 'flex', height: '80%',  }}>
          <ScrollView>
            <View>
              {
                this.state.pinData.length !== 0 ? <View><Text style={{ fontWeight: 'bold', marginLeft: 10, top: 5, bottom: 5,margin:3 }}>PINNED</Text></View> : null
              }
              <FlatList
                numColumns={this.state.numColumns} //toggle no of columns
                key={this.state.numColumns}
                data={Object.keys(this.state.pinData)}
                

                renderItem={({ item }) =>
                  <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                    onLongPress={() => this.handlerLongClick(this.state.pinData[item].noteId)}
                    onPress={() => this.state.selectionMode ? this.handleSelectionNode(this.state.pinData[item].noteId) : this.props.navigation.navigate('EditNote', { 'inform': this.state.pinData[item], "currentNoteId": this.state.pinData[item].noteId })}
                  >
                    <View style={{ backgroundColor:this.state.pinData[item].BgColor,paddingTop: 10, paddingBottom: 10, width: '100%', position: "relative", borderRadius: 7, borderWidth: 1, display: 'flex', borderColor: this.state.selectionMode && this.state.selectedData.includes(this.state.pinData[item].noteId) ? 'black' : '#DDE6E2', }}>
                      <View>
                        <Text style={styles.subText}>{this.state.pinData[item].Title}</Text>
                        <Text style={styles.subText}>{this.state.pinData[item].Note}</Text>

                        {
                          dateTime = this.state.pinData[item].Date+" "+this.state.pinData[item].Time,
                          note = this.state.pinData[item].Note,
                          title = this.state.pinData[item].Title,
                          // console.log('<<<<<<<<<<renderv<>>>>',dateTime),
                          // console.log(this.state.pinData[item].Date),

                          //local notification method
                          this.showNotification(dateTime,note,title),

                            this.state.pinData[item].Date !== undefined && this.state.pinData[item].Time !== undefined ?
                            <Chip icon={require('../Image/add_Alarm.png')} style={{ bottom: 17, width: 180, marginLeft: 6 }}>{this.state.pinData[item].Date}{'  '}{this.state.pinData[item].Time}</Chip>
                            : null
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              />

            </View>
            {
              this.state.unPinData.length !== 0 ? <View><Text style={{ fontWeight: 'bold', marginLeft: 10, top: 3, margin:3}}>OTHERS</Text></View> : null
            }
            <FlatList
              numColumns={this.state.numColumns} //toggle no of columns
              key={this.state.numColumns}
              data={Object.keys(this.state.unPinData)}

              renderItem={({ item }) =>
                <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                  onLongPress={() => this.handlerLongClick(this.state.unPinData[item].noteId)}
                  onPress={() => this.state.selectionMode ? this.handleSelectionNode(this.state.unPinData[item].noteId) : this.props.navigation.navigate('EditNote', { 'inform': this.state.unPinData[item], "currentNoteId": this.state.unPinData[item].noteId })}
                >
                  <View style={{ backgroundColor:this.state.unPinData[item].BgColor, paddingTop: 10, paddingBottom: 10, width: '100%', position: "relative", borderColor: '#DDE6E2', borderRadius: 7, borderWidth: 1, display: 'flex', borderColor: this.state.selectionMode && this.state.selectedData.includes(this.state.unPinData[item].noteId) ? 'black' : '#DDE6E2', }}>

                    <View style={{}}>
                      <Text style={styles.subText}>{this.state.unPinData[item].Title}</Text>
                      <Text style={styles.subText}>{this.state.unPinData[item].Note}</Text>
                      {
                        dateTime = this.state.unPinData[item].Date+" "+this.state.unPinData[item].Time,
                        note = this.state.unPinData[item].Note,
                        title = this.state.unPinData[item].Title,
                      
                        this.showNotification(dateTime,note,title),
                        
                        this.state.unPinData[item].Date !== undefined && this.state.unPinData[item].Time !== undefined ?
                          <Chip icon={require('../Image/add_Alarm.png')} style={{ bottom: 15, width: 180, marginLeft: 6 }}>{this.state.unPinData[item].Date}{'  '}{this.state.unPinData[item].Time}</Chip>
                          : null
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
            {/* </View> */}
          </ScrollView>
        </View >

        <View style ={{flexDirection :'row',height:'8%',}}> 
        <Appbar style={styles.bottom}>
          <View style={{flexDirection:'row',}}>
            <Appbar.Action icon= {require('../Image/tick.png')} onPress={() => this.props.navigation.navigate('Reminder')} />
            <Appbar.Action icon= {require('../Image/brush.png')} onPress={() => console.log(JSON.stringify(this.state.dataSource))} />
            <Appbar.Action icon=  {require('../Image/miceicon.png')}onPress={() => console.log('Pressed label')} />
            <Appbar.Action icon=  {require('../Image/imageicon.png')} onPress={() => console.log('Pressed delete')} /> 
            
            </View>
            <View style={{ fles:1,backgroundColor:'white'}}>
              <TouchableOpacity  style={{justifyContent:'flex-end',alignItems:'flex-end'}}
              onPress={() => this.props.navigation.navigate('CreateNote')}>
                <Image style={{height:"150%",bottom:25}} resizeMode="contain" source={require('../Image/addd.png')} />
              </TouchableOpacity>
            </View>
            </Appbar>
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
  },
  subView: {
    width: '100%',
    position: "relative",
    borderColor: 'pink',
    borderWidth: 1,
    backgroundColor: 'white',
    display: 'flex',
  },
  horizontalView: {
    borderColor: 'pink',
    borderWidth: 1,
    backgroundColor: 'red',
    display: 'flex',
  },
  subText: {
    marginLeft: 20
  },
  alaramView: {
    backgroundColor: 'lightblue',
    marginLeft: 7,
    bottom: 15,
    borderWidth: 1,
    width: 180,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bottom: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: .1,
    width:'100%',
    justifyContent:'space-between'
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