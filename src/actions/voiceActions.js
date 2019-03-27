import { FETCH_VOICE, FETCH_WAKE_WORD, NEW_REMINDER, CHANGE_MESSAGE, FETCH_VIDEO_ID, STOP_VIDEO, FETCH_USER, VOICE_INDICATOR } from './types';
import axios from 'axios';

export const fetchVoice = () => dispatch => {
  axios.get('http://localhost:4000/commands')
      .then(response => {
        console.log(response.data);
        if(response.data[0] === 'error'){
          console.log('lmao');
          dispatch({
            type: FETCH_VOICE,
            payload1: 'Couldnt understand what you said, try again',
            payload2: response.data[1],
            payload3: response.data[2],
            payload4: response.data[3],
            payload5: false,
          })
        }
        else if(response.data[1] === 'command not found'){
          dispatch({
            type: FETCH_VOICE,
            payload1: 'Command not found, try again. You said: ' + response.data[0],
            payload2: response.data[1],
            payload3: response.data[2],
            payload4: response.data[3],
            payload5: false,
          })
        }
        else if(response.data[1] === 'command'){
          console.log('in command');
          dispatch({
            type: FETCH_VOICE,
            payload1: 'You said: ' + response.data[0],
            payload2: response.data[1],
            payload3: response.data[2],
            payload5: false,
          })
        }
        else{
          dispatch({
            type: FETCH_VOICE,
            payload1: 'You said: ' + response.data[0],
            payload2: response.data[1],
            payload3: response.data[2],
            payload4: response.data[3],
            payload5: false,
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })  
};

export const fetchWakeWord = () => dispatch => {
  axios.get('http://localhost:4000/wakeWord')
      .then(response => {
        let yoloo = response.data.trim();
        console.log(yoloo);
        if(yoloo === "detected"){
          console.log('wakeWord detected')
          dispatch({
            type: FETCH_WAKE_WORD,
            payload1: true,
            payload2: 'please wait',
            payload3: '',
          })
        }
        else{
          console.log('not detected');
          var numb = Math.floor((Math.random() * 100) + 1);
          console.log(numb);
          dispatch({
            type: FETCH_WAKE_WORD,
            payload3: numb,
            payload4: 'not detected'            
          })
        }
      })
      .catch(function (error) {
        console.log('catch');
          var numb = Math.floor((Math.random() * 100) + 1);
          console.log(numb);
          dispatch({
            type: FETCH_WAKE_WORD,
            payload3: numb,
            payload4: 'not detected'            
          })
      })  
}

export const createReminder = (value,date,username) => dispatch => {
  axios.post('http://localhost:4000/users/db_reminders', 
    { desc:value, date:date, username:username })
      .then((result) => {
        console.log(result.data);
        dispatch({
            type: NEW_REMINDER,
            payload1: result.data,
            payload2: ''
        })
     });
}

export const voiceIndicator = v_indicator => dispatch => {
  console.log('yo')
  dispatch({
      type: VOICE_INDICATOR,
      payload: v_indicator,
  }) 
}

export const changeMessage = username => dispatch => {
  dispatch({
      type: CHANGE_MESSAGE,
      payload: 'Hey, '+username,
  }) 
}

export const fetchVideoId = (value,youtube) => dispatch => {
  youtube.searchVideos(value, 1)
        .then(results => {
          dispatch({
            type: FETCH_VIDEO_ID,
            payload1: results[0].id,
            payload2: ''
          })
          console.log(results[0].id)
        })
        .catch(console.log);
}

export const stopVideo = () => dispatch => {
  dispatch({
      type: STOP_VIDEO,
      payload: 0
  }) 
}

export const fetchUser = username => dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: username
  }) 
}