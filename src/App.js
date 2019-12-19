import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.scss';
const randomUserUrl = 'https://randomuser.me/api/?results=20&nat=us,ca&inc=id,name,gender,nat,dob,picture&noinfo';

class BirthdayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users : null,
    };
  }
  getUsers () {
    axios.get(randomUserUrl)
        .then(response => {

          this.setState(
              {
                users: response.data.results
              }
          )

          console.log(response.data.results);
        })
        .catch(error => {
          console.log(error);
        });
  }
  componentDidMount() {
    this.getUsers();
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