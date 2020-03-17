import React, {Component} from 'react';
import { connect } from 'react-redux'

class Profile extends React.Component {

  constructor(props){
    super(props)

  }

  render(){

    return (
      <div>
        <h1> Profile </h1>
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
