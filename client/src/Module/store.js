import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import middlewareForm from './middleware/middleware'
import rootReducer from './reducers'
import langage from './langage'

const initialState = {
  lang : langage['fr'],
  DataForm : { depart: 'Denfert Rochereaux', arrive : 'Aéroport Orly' }
}

const middleware = [
  thunk,
  middlewareForm
]

const composedEnhancers = compose(
  applyMiddleware( ...middleware )
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
