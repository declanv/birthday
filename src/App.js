import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.scss';
const randomUserUrl = 'https://randomuser.me/api/?results=20?nat=us,ca?inc=id,name,gender,nat,dob,picture';

class BirthdayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users : null,
    };
  }
  getUsers () {

  }
  render() {
    return (
        <div id='appContainer'>
          <h1>Birthday Tracker</h1>
        </div>
    );
  };
}


export default BirthdayList;