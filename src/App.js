import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.scss';
import candle from "./assets/img/candle.png";
import Confetti from 'react-confetti';
import _debounce from 'lodash.debounce'
const randomUserUrl = 'https://randomuser.me/api/?results=20&nat=us,ca&inc=id,name,gender,nat,dob,picture&noinfo';


class BirthdayList extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			users : [],
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		};
  }
  sortUsers() {
		const sortByBirthday = () =>
			(a, b) => {
				let aDob = new Date(a['dob']['date']);
				let aBirthdayMonth = aDob.getMonth();
				let aBirthdayDay = aDob.getDate();
				let bDob = new Date(b['dob']['date']);
				let bBirthdayMonth = bDob.getMonth();
				let bBirthdayDay = bDob.getDate();
				if (aBirthdayMonth === bBirthdayMonth) {
					if (aBirthdayDay === bBirthdayDay) {
						return 0;
					} else if (aBirthdayDay < bBirthdayDay) {
						return -1;
					} else {
						return 1;
					}
				} else if (aBirthdayMonth < bBirthdayMonth) {
					return -1;
				} else {
					return 1;
				}
			}

		const sortedUsers = this.state.users.slice();
		sortedUsers.sort(sortByBirthday());
		this.setState(
			{
			users: sortedUsers
		});

	}
  checkBirthday(birthdayMonth, birthdayDay) {
	let today = new Date();
	let todayMonth = today.getMonth();
	let todayDay = today.getDate();

	if (todayMonth === birthdayMonth && todayDay === birthdayDay) {
	  return {
	  	msg: "Birthday Today!",
			class: 'today'
		};
	//  Re-read the instructions: this is much simpler than I thought: we're only checking for the current year, not future years also
	} else if (todayMonth <= birthdayMonth) {

		if (todayDay < birthdayDay) {
			return {
				msg: "Birthday Upcoming",
				class: 'upcoming'
			};
		} else {
			return {
				msg: "Birthday Passed",
				class: 'passed'
			};
		}
	} else {
	  return {
	  	msg: "Birthday Passed",
			class: 'passed'
		};
	}

  }
  componentDidMount() {
		axios.get(randomUserUrl)
				.then(response => {
					this.setState({users: response.data.results});
				})
				.catch(error => {
					console.log(error);
				});
		// Seed data for testing (randomuser.me was down for a day)
	  // this.setState(
		//   { users: [
		//   	{
		// 		  "id": "123456789",
		// 		  "gender": "female",
		// 		  "name": {"title": "miss","first": "Stella","last": "Bonheim"},
		// 		  "dob": {"date":"1987-12-21T14:48:00"},
		// 		  "picture": {"large": "https://randomuser.me/api/portraits/women/50.jpg",
		// 			  "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
		// 			  "thumbnail":"https://randomuser.me/api/portraits/thumb/women/50.jpg"},
		// 		  "nat": "CA"
		// 	  },
		// 		{
		// 		  "id": "123456789",
		// 		  "gender": "female",
		// 		  "name": {"title": "miss","first": "ramona","last": "carter"},
		// 		  "dob": {"date":"2011-12-25T14:48:00"},
		// 		  "picture": {"large": "https://randomuser.me/api/portraits/women/90.jpg",
		// 			  "medium": "https://randomuser.me/api/portraits/med/women/90.jpg",
		// 			  "thumbnail":"https://randomuser.me/api/portraits/thumb/women/90.jpg"},
		// 		  "nat": "USA"
		// 	  },
		// 		{
		// 		  "id": "123456789",
		// 		  "gender": "male",
		// 		  "name": {"title": "mr","first": "arthur","last": "fontina"},
		// 		  "dob": {"date":"1956-01-15T14:48:00"},
		// 		  "picture": {"large": "https://randomuser.me/api/portraits/men/90.jpg",
		// 			  "medium": "https://randomuser.me/api/portraits/med/men/90.jpg",
		// 			  "thumbnail":"https://randomuser.me/api/portraits/thumb/men/90.jpg"},
		// 		  "nat": "USA"
		// 	  },
		// 		]
		//   }
	  // );
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
			<div className='user-card' key={user.dob.date}>
				<div className={`birthday-status ${birthdayStatus.class}`}>
					<p className={'status'}>{birthdayStatus.msg}:</p>
					<p className={'birthday'}>{dob.toLocaleString('default', { month: 'long' })} {birthdayDay}</p>
				</div>
				<div className="user-info">
					<div className="user-pic">
						<div className='pic-wrapper'>
							<img className='pic' src={user.picture.large} alt={`A portrait of: ${user.name.first} ${user.name.last}`}></img>
						</div>
					</div>
					<div className='name-nat'>
						<p className="name">
							{user.name.first} {user.name.last}
						</p>
						<span className="bio-info">
							<p className="gender">
								{user.gender}
							</p>
							<p className="nat">
								from {user.nat === 'CA' ? 'Canada': 'USA'}
							</p>
							<p className="dob">
								Born: {dob.toLocaleString('default', { month: 'long' })} {birthdayDay}, {birthdayYear}
							</p>
						</span>
					</div>
				</div>
			</div>
		)
		}) : null;
		return (
			<div id='confetti-container'>
				<Confetti
					width={windowWidth}
					height={windowHeight}
				/>
				<div id='cake-box'>

					<div id='candles-container'>
						<img className='candle' src={candle} alt={'An illustration of a candle'}></img>
						<img className='candle' src={candle} alt={'An illustration of a candle'}></img>
						<img className='candle' src={candle} alt={'An illustration of a candle'}></img>
						<img className='candle' src={candle} alt={'An illustration of a candle'}></img>
						<img className='candle' src={candle} alt={'An illustration of a candle'}></img>
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
			</div>
		);
  };
}


export default BirthdayList;