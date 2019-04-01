import React from 'react'
import Progressbar from '../../Progressbar'
import TextInput from '../TextInput'
import Buttons from '../../Buttons'
import SelectForm from '../../SelectForm'
import {Select} from 'antd'
import DatePick from '../DatePick'

const Profil = (props) => {

  return (
    <form className='contain-form ct-s-7'>
      <div>
        <div className='ct-h'>
          <DatePick />
          { props.tabActive === 0 && <SelectForm options={ props.selPlaces } name='place' type='select'/> }
        </div>
        { (props.tabActive === 0) && <Progressbar /> }
        <TextInput className='cl-l-1' name='LastName' placeholder='Nom' onBlur={ props.getData } style={{color:"#82898d"}}/>
        <TextInput className='cl-r-1' name='FirstName' placeholder='Prénom' onBlur={ props.getData }/>
        <TextInput className='cl-l-1' name='CompagnyName' placeholder='Nom de la Société (optionnel)' onBlur={ props.getData }/>
        <TextInput className='cl-r-1'name='email' placeholder='Adresse de messagerie' onBlur={ props.getData }/>
        <TextInput className='cl-l-1' typeInput='text-tel' name='phoneNum' placeholder='X XX XX XX XX' onBlur={ props.getData }/>
      </div>
      <div style={{textAlign:'center'}}>
        <Buttons action={ props.onSubmit } text={ 'Valider' } className='round-droit alone'/>
      </div>
    </form>
  )
}

export default Profil
