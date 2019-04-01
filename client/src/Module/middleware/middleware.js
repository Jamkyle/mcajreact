const middlewareForm = store => next => action => {
    // console.log(action);
  if( action.type === 'SEND_FORM_DATA'){

    next({type:'RECEIVE_FORM_DATA', data: action.data})
  }
  if( action.type === 'GET_USER')
    next({type:'DATA_USER', data : action.user})
  next(action)

}

export default middlewareForm
