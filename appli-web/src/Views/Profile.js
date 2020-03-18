import React, {Component} from 'react';
import { connect } from 'react-redux'
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
import history from '../history';


class Profile extends React.Component {

  constructor(props){
    super(props)

  }

  _Deco(){
    cookie.remove('userId', { path: '/' })
    var action = { type: "TOGGLE_UNAUTH"}
    this.props.dispatch(action)
    history.push('/');
  }

  render(){

    return (
      <div>
        <h1> Profile </h1>

        <Button variant="contained" color="primary" onClick={()=>this._Deco()}>
          Deconnexion
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(Profile)
