import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd';
import { connect } from 'react-redux';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// var MapboxDirections = ('@mapbox/mapbox-gl-directions');

// import Geocoder from '@mapbox/react-geocoder'
// import GoogleMap from 'google-map-react'

const Option = Select.Option

class SelectForm extends Component{
  state = { input : '' }
  autocomplete = null

  getData = (e) => {
    console.log(e);
    let obj = {}
    obj[this.props.name] = e
    this.props.sendData({...obj})
  }

  handleValue = (e) => {
    let obj = {}
    obj[this.props.name] = e.target.value
    this.props.sendData({...obj})
  }

  componentDidMount(){
    const { lang } = this.props.state
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFta3lsZSIsImEiOiJjanZ3dnBnd3kwY2R2M3lyeHplZHR2dmZlIn0.rXSLym6ex6vIvUEwWTbFAw';
    this.map = new mapboxgl.Map({
                  container: 'map',
                  style: 'mapbox://styles/mapbox/streets-v9',
                  center: [2.341176,48.8507837],
                  zoom: 13
                });

    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: 'fr',
      placeholder : lang.form.select[this.props.name],
      getItemValue: (val) => {
        this.getData(val.place_name)
        return val.place_name
      },
      render : function(item) {
        // extract the item's maki icon or use a default
        var maki = item.properties.maki || 'marker';
        var res = item.place_name.split(',');
        return "<div class='geocoder-dropdown-item'><div class='mapboxgl-ctrl-geocoder--suggestion-title'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" + maki + "-15.svg'><span class='geocoder-dropdown-text'>" + res[0] + "</span></div><div class='mapboxgl-ctrl-geocoder--suggestion-address'>" + res.splice(1, res.length).join(',') + "</div></div>";
      },
    })

    if( this.props.type !== 'select' ){
      this.refs[ 'select-'+this.props.name ].appendChild(this.geocoder.onAdd(this.map))
      // this.autocomplete = new window.google.maps.places.Autocomplete(this.refs['select-'+this.props.name], mapOption )
      // this.autocomplete.addListener('place_changed', () => this.getData(this.refs['select-'+this.props.name].value) );
    }

    let obj = {}
    this.props.name === 'place' ? obj[this.props.name] = 1 : obj[this.props.name] = this.refs['select-'+this.props.name].value
    this.props.sendData({...obj})
  }


  componentDidUpdate(nextProps){
    // if(nextProps.name === 'depart' && this.props.name === 'depart')
      if (nextProps.type !== this.props.type) {
        if(this.props.type !== 'select'){
          // this.autocomplete = new window.google.maps.places.Autocomplete(this.refs['select-'+this.props.name], mapOption )
          // this.autocomplete.addListener('place_changed', () => this.getData(this.refs['select-'+this.props.name].value) );
          this.refs[ 'select-'+this.props.name ].appendChild(this.geocoder.onAdd(this.map))
        }
        let value = this.refs['select-'+this.props.name].value
        let obj = {}
        obj[this.props.name] = value
        this.props.sendData({ ...obj })
      }

    // if(nextProps.name === 'arrive' && this.props.name === 'arrive')
    //   if (nextProps.type !== this.props.type) {
    //     let value = this.refs['select-'+this.props.name].value
    //     let obj = {}
    //     obj[this.props.name] = value
    //     this.props.sendData({...obj})
    //   }
  }

  render(){
    const { lang } = this.props.state
    const options = this.props.options.map( (e,i) => {
      if(this.props.name === 'place') return <Option key={e+i} value={e}>{e}</Option>
      else return <option key={e+i} value={e}>{e}</option>
    })
    let input
    if(this.props.type === 'select'){
      if (this.props.name === 'place') {
        input =  <Select style={{ minWidth:50 }} defaultValue={this.props.value||'place'} name={ this.props.name } className="itemForm addCarret datepicker place" ref={ 'select-'+this.props.name } onChange={ this.getData } >
                  { options }
                </Select>
      }else {
        input =  <select name={ this.props.name } className="itemForm addCarret fs-norm" ref={ 'select-'+this.props.name } onChange={ this.handleValue }>
                  { options }
                </select>
      }

    }
    else {
      // input = <div
      //   id='search'
      //   style={ Style.InputText }
      //   onChange = {this.getData }
      //   className={ "font-black itemForm fs-norm "+this.props.styleclass }
      //   type='text'
      //   ref={'select-'+this.props.name}
      //   name={ this.props.name }
      //   placeholder={ lang.form.select[this.props.name] } />
      input = <div ref={ 'select-'+this.props.name }
                    onChange={ this.getData }
                    />
    }
    return(
      <div className='inputMap'>
        <div id='map' style={{ display:'none' }}></div>
        <img src={ this.props.img } alt={ this.props.img }/>
        { input }
      </div>
    )
  }
}

SelectForm.proptypes = {
  img : PropTypes.string,
  type : PropTypes.string,
  name : PropTypes.string,
  options : PropTypes.array,
  sendData : PropTypes.func,
}

const mapOption = {
  componentRestrictions : { country : "fr" }
}

const Style = {
  InputText : { width: '80%', padding : '9px' ,border : 'none', backgroundColor : 'transparent', outline: 'none', color :'white' }
}

export default connect(
  state => ({ state }),
  dispatch => ({
    sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val }),
  })
)(SelectForm)
