import { combineReducers } from 'redux'
import FormReducer from './FormReducer'
import langReducer from './langReducer'
import scrollReducer from './scrollReducer'
export default combineReducers({
  DataForm : FormReducer,
  lang : langReducer,
  scrollPos : scrollReducer
})
