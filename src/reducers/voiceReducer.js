import { FETCH_VOICE, FETCH_WAKE_WORD, NEW_REMINDER, NEW_ALARM, CHANGE_MESSAGE, FETCH_VIDEO_ID, STOP_VIDEO, FETCH_USER } from '../actions/types';

const initialState = {
    intent: '',
    value: '',
    date: '',
    goToVoiceApi: false,
    msg: 'Welcome!',
    videoId: 0,
    username: 'default user',
}

export default function (state = initialState, action) {
  switch(action.type) {
      case FETCH_VOICE:
        return {
            ...state,
            msg: action.payload1,
            intent: action.payload2,
            value: action.payload3,
            date: action.payload4,
            goToVoiceApi: action.payload5
        };
      case FETCH_WAKE_WORD:
        return {
            ...state,
            goToVoiceApi: action.payload1,
            msg: action.payload2,
            value: action.payload3,
            intent: action.payload4,
        };
      case NEW_REMINDER:
        return {
            ...state,
            msg: action.payload1,
            intent: action.payload2
        };
      case NEW_ALARM:
        return {
            ...state,
            msg: action.payload1,
            intent: action.payload2
        };
      case CHANGE_MESSAGE:
        return {
            ...state,
            msg: action.payload
        };
      case FETCH_VIDEO_ID:
        return {
            ...state,
            videoId: action.payload1,
            intent: action.payload2
        };
      case STOP_VIDEO:
        return {
            ...state,
            videoId: action.payload
        };
      case FETCH_USER:
        return {
            ...state,
            username: action.payload
        };
      default: 
        return state;
  }
}
