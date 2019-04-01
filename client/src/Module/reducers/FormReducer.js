const FormReducer = ( state= {}, action ) => {
  if(action.type === 'RECEIVE_FORM_DATA')
    return { ...state, ...action.data }
  return state
}

export default FormReducer
