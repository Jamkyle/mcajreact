const userReducer = ( state = { user : null }, action ) => {

  if(action.type === 'DATA_USER')
    console.log(action.data);
  return state
}
