import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.scss';
const randomUserUrl = 'https://randomuser.me/api/?results=20&nat=us,ca&inc=id,name,gender,nat,dob,picture&noinfo';

class BirthdayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users : [],
    };
  }
  componentDidMount() {
    axios.get(randomUserUrl)
        .then(response => {
          this.setState({users: response.data.results});
          console.log(response.data.results);
        })
        .catch(error => {
          console.log(error);
        });
  }
  render() {
    let userList = this.state.users.length > 0 ? this.state.users.map((step, i) => {
        let user = this.state.users[i];
        return (
            <div key={user.dob.date}>
              <p>
                {user.name.first}
              </p>
            </div>
        )
      }) : null;
    return (
        <div id='appContainer'>
          <h1>Birthday Tracker</h1>
          <div>
            {userList}
          </div>
        </div>
    );
  };
}


export default BirthdayList;