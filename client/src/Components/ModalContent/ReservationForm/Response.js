import React from 'react'
import Buttons from '../../Buttons'

const Response = (props) => {
  console.log(props);
  return (
    <div>
      <p> { props.DataForm.response } </p>
      <Buttons action={ props.toggleModal } className='' text='Terminer'/>
    </div>
  )
}

export default Response
