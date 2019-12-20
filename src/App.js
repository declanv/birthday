import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.scss';
import candle from "./assets/img/candle.png";
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
  checkBirthday(birthdayMonth, birthdayDay) {
	let today = new Date();
	let todayMonth = today.getMonth();
	let todayDay = today.getDate();

	if (todayMonth === birthdayMonth && todayDay === birthdayDay) {
	  console.log(`Birthday Today!: Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day, and birthdayDay: ${birthdayDay}`);
	  return "Birthday Today!";
	//  Re-read the instructions: this is much simpler than I thought: we're only checking for the current year, not future years also
	} else if (todayMonth <= birthdayMonth) {

		if (todayDay < birthdayDay) {
			return "Birthday Upcoming";
			console.log(`Birthday Upcoming: Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day: ${todayDay}, and birthdayDay: ${birthdayDay}`)
		} else {
			return "Birthday Passed";
			console.log(`Birthday Passed: Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day: ${todayDay}, and birthdayDay: ${birthdayDay}`)
		}
	} else {
	  console.log(`Birthday Passed: Today's month: ${todayMonth}, and BirthdayMonth: ${birthdayMonth}. Today's day: ${todayDay}, and birthdayDay: ${birthdayDay}`)
	  return "Birthday Passed";
	}

  }
  componentDidMount() {
	// axios.get(randomUserUrl)
	//     .then(response => {
	//
	//       this.setState({users: response.data.results});
	//       console.log(response.data.results);
	//     })
	//     .catch(error => {
	//       console.log(error);
	//     });
	  this.setState(
		  { users: [
		  	{
				  "id": "123456789",
				  "gender": "female",
				  "name": {"title": "miss","first": "Stella","last": "Bonheim"},
				  "dob": {"date":"1987-02-02T14:48:00"},
				  "picture": {"large": "https://randomuser.me/api/portraits/women/50.jpg",
					  "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
					  "thumbnail":"https://randomuser.me/api/portraits/thumb/women/50.jpg"},
				  "nat": "CA"
			  },
				{
				  "id": "123456789",
				  "gender": "female",
				  "name": {"title": "miss","first": "ramona","last": "carter"},
				  "dob": {"date":"2011-10-10T14:48:00"},
				  "picture": {"large": "https://randomuser.me/api/portraits/women/90.jpg",
					  "medium": "https://randomuser.me/api/portraits/med/women/90.jpg",
					  "thumbnail":"https://randomuser.me/api/portraits/thumb/women/90.jpg"},
				  "nat": "USA"
			  },
				{
				  "id": "123456789",
				  "gender": "male",
				  "name": {"title": "mr","first": "arthur","last": "fontina"},
				  "dob": {"date":"1956-01-15T14:48:00"},
				  "picture": {"large": "https://randomuser.me/api/portraits/men/90.jpg",
					  "medium": "https://randomuser.me/api/portraits/med/men/90.jpg",
					  "thumbnail":"https://randomuser.me/api/portraits/thumb/men/90.jpg"},
				  "nat": "USA"
			  },
				]
		  }
	  );
  }
  render() {
	let userList = this.state.users.length > 0 ? this.state.users.map((step, i) => {
		let user = this.state.users[i];
		let dob = new Date(user.dob.date);
		let birthdayMonth = dob.getMonth();
		let birthdayDay = dob.getDate();
		let birthdayYear = dob.getUTCFullYear();
		let birthdayStatus = this.checkBirthday(birthdayMonth, birthdayDay);
		return (
			<div class='user-card' key={user.dob.date}>
			  <div className={'birthday-status'}>
					<p className={'status'}>{birthdayStatus}:</p>
					<p className={'birthday'}>{dob.toLocaleString('default', { month: 'long' })} {birthdayDay}</p>
			  </div>
				<div class="user-info">
					<div className="user-pic">
						<img className='pic' src={user.picture.large}></img>
					</div>
					<div class='name-nat'>
						<p class="name">
							{user.name.first} {user.name.last}
						</p>
						<span class="bio-info">
							<p class="gender">
								{user.gender}
							</p>
							<p class="nat">
								{user.nat === 'CA' ? 'Canada': 'USA'}
							</p>
							<p class="dob">
								Born: {dob.toLocaleString('default', { month: 'long' })} {birthdayDay}, {birthdayYear}
							</p>
						</span>
					</div>
				</div>
			</div>
		)
	  }) : null;
	return (

		<div id='cake-box'>
			<div id='candles-container'>
				<img class='candle' src={candle}></img>
				<img class='candle' src={candle}></img>
				<img class='candle' src={candle}></img>
				<img class='candle' src={candle}></img>
				<img class='candle' src={candle}></img>
			</div>
			<div id='cake'>
				<div id='frosting-container'>
					<div id='frosting'></div>
				</div>
				<div id='title-container'>
					<h1>Birthday Tracker</h1>
				</div>
				<div id='user-list'>
					<button id='sort-button'
						onClick={()=>this.sortUsers()}
					>
						Sort by birthday month
					</button>
					{userList}
				</div>
			</div>
		</div>
	);
  };
}


export default BirthdayList;