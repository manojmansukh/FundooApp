import axios from 'axios';
import * as React from 'react';
import { AsyncStorage } from "react-native";
import Notes from '../Component/Dashboard';
var uid ;
var data
export async function UserId() {
    console.log('<<<<<<<<<<<<<<<<<axios');
   await AsyncStorage.getItem("UserId").then((value) => {
        console.log('MMM',value);
        uid = value
        console.log(uid);    
    })
}

export async function getNotes(callback) {
    console.log("in get axios",uid);
    
    await axios.get('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK')
    
     .then((response) => {
         data = response.data
        //  this.filtereddata = products.filter(product => product.department.includes('food'))
        console.log('response data>>>>>>>>>>>>',data);
        callback(data)
     })
     .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
}

export function saveNote(title,note,date,time,pin,bgColor){
    axios.post('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK',{
        Title: title,
          Note: note,
          Date: date,
          Time: time,
          Pin: pin,
          BgColor: bgColor,
          Archive:  false,
          Trash: false,
    })
}

export function editNote(currentNoteId,title,note,pin, archive, trash, bgColor){
    console.log('MMMMMMMMMMMMM',title);
    
    axios.put('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes/'+currentNoteId+'.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK',{
        Title: title,
        Note: note,
        Pin: pin,
        Archive: archive,
        Trash: trash,
        visible: false,
        BgColor: bgColor
      })
}

export function setReminder(currentNoteId,date,time){
    axios.put('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes/'+currentNoteId+'.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK',{
        Date: date,
        Time: time,
      })
}

export function setPin(currentNoteId,pin){
    axios.put('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes/'+currentNoteId+'.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK',{
        Pin: pin,
      })
}

export function setArchive(currentNoteId,archive){
    axios.put('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes/'+currentNoteId+'.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK',{
            Archive: archive  
        })
}

export function moveToTrash(currentNoteId,trash){
    console.log('mmmmmmmmmm',trash,currentNoteId);
    axios.put('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes/'+currentNoteId+'.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK',{
    Trash: trash,
      })
}

export function PermanentDelete(currentNoteId){
    axios.delete('https://database-cf39b.firebaseio.com/users/'+uid+'/Notes/'+currentNoteId+'.json?auth=MEAYJARLyy6m7xOGMIUlyApskG3DnMCxXJ9ql0EK')
}