import React from 'react'
import Progressbar from '../../Progressbar'
import TextInput from '../TextInput'
import Buttons from '../../Buttons'
import SelectForm from '../../SelectForm'
import { Select } from 'antd'
import DatePick from '../DatePick'
import { validator } from '../../../Module/helpers'


const Profil = ( props ) => {
  return (

    <form className='contain-form ct-s-7'>
      <div>
        <div className='ct-h'>
          <DatePick value={ { date : props.data.date, hour : props.data.hours } }/>
          { props.tabActive === 0 && <SelectForm options={ props.selPlaces } name='place' type='select' value={ props.data.place }/> }
        </div>
        { (props.tabActive === 0) && <Progressbar /> }
        <TextInput className='cl-l-1' name='LastName' required='true' placeholder='Nom' onBlur={ props.getData } style={{color:"#82898d"}} value={ props.data.LastName }/>
        <TextInput className='cl-r-1' name='FirstName' required='true' placeholder='Prénom' onBlur={ props.getData } value={ props.data.FirstName }/>
        <TextInput className='cl-l-1' name='CompagnyName' placeholder='Nom de la Société (optionnel)' onBlur={ props.getData } value={ props.data.CompagnyName }/>
        <TextInput className='cl-r-1' name='email' required='true' placeholder='Adresse de messagerie' onBlur={ props.getData } value={ props.data.email }/>
        <TextInput className='cl-l-1' typeInput='text-tel' required='true' name='phoneNum' placeholder='X XX XX XX XX' onBlur={ props.getData } value={ props.data.phoneNum }/>
      </div>
      <div style={{textAlign:'center'}}>
        <Buttons action={ () => validator( props.data, props.onSubmit ) } text={ 'Valider' } className='round-droit alone'/>
      </div>
    </form>
  )
}

export default Profil
