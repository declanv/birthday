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
  sortUsers() {
    console.log('sorting users');
  }
  checkBirthday(userDob) {
    let today = new Date();
    let todayMonth = today.getMonth();
    let todayDay = today.getDate();
    let dob = new Date(userDob);
    let birthdayMonth = dob.getMonth();
    let birthdayDay = dob.getDate();

    if (todayMonth === birthdayMonth && todayDay === birthdayDay) {
      console.log(`Birthday Today!: Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day, and birthdayDay: ${birthdayDay}`);
      return "Birthday Today!";
    //  This is actually pretty tricky
    } else if ((todayMonth - birthdayMonth <= 6 && todayMonth > birthdayMonth) || (todayMonth === birthdayMonth && todayDay > birthdayDay)) {
      console.log(`Birthday Upcoming": Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day, and birthdayDay: ${birthdayDay}`)
      return "Birthday Upcoming";
    } else {
      console.log(`Birthday Passed": Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day, and birthdayDay: ${birthdayDay}`)
      return "Birthday Passed";
    }

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
        let birthdayStatus = this.checkBirthday(user.dob.date);
        return (
            <div key={user.dob.date}>
              <p>
                {user.name.first}
              </p>
            </div>
        )
      }) : null;
    return (
        <div id='cake'>
          <div id='titleContainer'>
            <h1>Birthday Tracker</h1>
          </div>
          <div id='userList'>
            <button id='sortButton'
              onClick={()=>this.sortUsers()}
            >
            </button>
            {userList}
          </div>
        </div>
    );
  };
}


export default BirthdayList;