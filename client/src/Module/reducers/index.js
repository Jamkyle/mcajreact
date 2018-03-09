import { combineReducers } from 'redux'
import FormReducer from './FormReducer'
import langReducer from './langReducer'

export default combineReducers({
  DataForm : FormReducer,
  lang : langReducer
})
