import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet ,Image, Text, TouchableOpacity} from 'react-native';
import { View } from 'native-base';
import { isSignedIn } from "./Authentication";
import { getUserId} from '../Services/FireBaseDb'
import { UserId } from '../Services/AxiosDb'

export default class Notes extends React.Component {
  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center',top:50,}}> 
          <Image source={require('../Image/Logo.png')}
                style={{ width: "150%", height:200,top:10,tintColor:'#1e59c7' }} 
                resizeMode='center'
                />
                <View style={{flexDirection:'row',alignItems:'flex-start',top:-12,}}>
                <View ><Text style={{color: '#4285F4',fontSize:60,fontWeight:'bold',}}>F</Text></View>
                <View><Text style={{color: '#DB4437',fontSize:60,fontWeight:'bold'}}>u</Text></View>
                <View ><Text style={{color: '#F4B400',fontSize:60,fontWeight:'bold'}}>n</Text></View>
                <View ><Text style={{color: '#4285F4',fontSize:60,fontWeight:'bold'}}>D</Text></View>
                <View ><Text style={{color: '#0F9D58',fontSize:60,fontWeight:'bold'}}>o</Text></View>
                <View ><Text style={{color: '#DB4437',fontSize:60,fontWeight:'bold'}}>o</Text></View>
                </View>

                <View style={{top:250,justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={{fontSize:19}}>from</Text>
                    <Text style={{fontSize:25,fontWeight:'bold'}}>BridgeLabz</Text>
                </View>
      </View>  
    );
  }
  
  componentDidMount(){
      const{navigate}=this.props.navigation
      setTimeout(()=>{
        
        //firebase Method
        getUserId();
        UserId();

        isSignedIn()
        .then(res => {
          if(res == true)
            {
              this.props.navigation.navigate('Drawer')
            }
            else{
              this.props.navigation.navigate('SignIn')
            }
        })
        .catch(err => alert("An error occurred"));
        
      },1000)

  }
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor:'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth:.1,
    //borderColor: 'red',

  },
});