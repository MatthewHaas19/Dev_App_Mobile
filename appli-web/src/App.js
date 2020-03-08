import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Views/Login.js'
import NavBar from './Views/NavBar.js'


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }

  componentDidMount() {
    fetch('https://dev-mobile-ig.herokuapp.com/users/users',{
    method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ data })
      });
  }


  render(){

    const users = this.state.data.map((n,key) => {
      return <p>{n.username}</p>;
    });


    return (
      /*<div className="App">
        <h1>L'application de Juju, Temil & Matt</h1>
        <h2>Nos utilisateurs</h2>
        {users}
      </div>
      */
      <div>
      <NavBar />
      <Login />
      </div>
    );
  }
}

export default App;
