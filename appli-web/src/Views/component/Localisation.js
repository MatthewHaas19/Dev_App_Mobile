import React from "react";
import { geolocated } from "react-geolocated";
import { connect } from 'react-redux'
class Localisation extends React.Component {

    constructor(props){
      super(props)
    }

    storeCoord(coords){
      var position = {
        latitude:coords.latitude,
        longitude:coords.longitude
      }
      var action = { type: "TOGGLE_POSITION", currentPosition: position}
      this.props.dispatch(action)
    }

    render() {

      if(this.props.isGeolocationAvailable && this.props.isGeolocationEnabled){
        if(this.props.coords){
          this.storeCoord(this.props.coords)
        }
      }


        return (<div></div>);
    }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Localisation));
