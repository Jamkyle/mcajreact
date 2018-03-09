import langage from '../langage'

const langReducer = ( state = langage['fr'], action ) => {

  if(action.type === 'CHANGE_LANGAGE')
    return langage[action.lang]
  return state
}

export default langReducer;
