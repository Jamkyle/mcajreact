import React from 'react'
import Buttons from '../../Buttons'

const Response = (props) => {
  return (
    <div>
      { props.DataForm.response }
      <Buttons onClick={() => props.toggleModal() } class=''> Terminer </Buttons>
    </div>
  )
}

export default Response
