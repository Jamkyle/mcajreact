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
        { props.fields.map( (input, key) => {
          return <TextInput className='cl-l-1' key={key} name={input.name} required={input.required === false ? false : true} placeholder={input.placeholder} onBlur={ props.getData } value={ props.data[input.name]}/>
        }) }
        <TextInput className='cl-l-1' typeInput='text-tel' required='true' name='phoneNum' placeholder='X XX XX XX XX' onBlur={ props.getData } value={ props.data.phoneNum }/>
      </div>
      <div style={{textAlign:'center'}}>
        <Buttons action={ () => validator( props.data, props.onSubmit ) } text={ 'Valider' } className='round-droit alone'/>
      </div>
    </form>
  )
}

export default Profil
