import React from 'react';
import axios from 'axios';
import './App.scss';
import candle from "./assets/img/candle.png";
import Confetti from 'react-confetti';
import _debounce from 'lodash.debounce'
const randomUserUrl = 'https://randomuser.me/api/?results=20&nat=us,ca&inc=id,name,gender,nat,dob,picture&noinfo';

function User(props) {
	const user = props.user;
	const dob = new Date(user.dob.date);
	const birthdayMonth = dob.getMonth();
	const birthdayDay = dob.getDate();
	const birthdayYear = dob.getUTCFullYear();

	const checkBirthday = function(birthdayMonth, birthdayDay) {
		let today = new Date();
		let todayMonth = today.getMonth();
		let todayDay = today.getDate();
		if (todayMonth === birthdayMonth) {
			if (todayDay === birthdayDay) {
				return {
					msg: "Birthday Today!",
					class: 'today'
				};
			} else if (todayDay < birthdayDay) {
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
		} else if (todayMonth > birthdayMonth) {
			return {
				msg: "Birthday Passed",
				class: 'passed'
			};
		} else {
			return {
				msg: "Birthday Upcoming",
				class: 'upcoming'
			};
		}
	}
	let birthdayStatus = checkBirthday(birthdayMonth, birthdayDay);
	return (
		<div className='user-card'>
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
	);
}
class BirthdayList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			sorted: false,
			asc: true
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

		if (!this.state.sorted) {
			const sortedUsers = this.state.users.slice();
			sortedUsers.sort(sortByBirthday());
			this.setState(
				{
					users: sortedUsers,
					sorted: true,
					asc: false
				});
		} else {
			this.setState({
				users: this.state.users.slice().reverse(),
				asc: !this.state.asc ? true : false
			})
		}

	}
	resize = _debounce(
		() =>
			this.setState({
				windowWidth: window.innerWidth,
				windowHeight: document.getElementById('cake').offsetHeight
			})
		,100)
	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}
  componentDidMount() {
		axios.get(randomUserUrl)
				.then(response => {
					this.setState({users: response.data.results});
				})
				.catch(error => {
					console.log(error);
					// Seed data for testing (randomuser.me was down for a day)
					//=========================================================
					this.setState(
					  { users: [
					  	{
							  "id": "123456789",
							  "gender": "female",
							  "name": {"title": "miss","first": "Stella","last": "Bonheim"},
							  "dob": {"date":"1987-12-21T14:48:00"},
							  "picture": {"large": "https://randomuser.me/api/portraits/women/50.jpg",
								  "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
								  "thumbnail":"https://randomuser.me/api/portraits/thumb/women/50.jpg"},
							  "nat": "CA"
						  },
							{
							  "id": "123456789",
							  "gender": "female",
							  "name": {"title": "miss","first": "ramona","last": "carter"},
							  "dob": {"date":"2011-12-25T14:48:00"},
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
				});

		// Setting up resize listener for confetti
		window.addEventListener('resize', this.resize);
		this.resize();

  }
  render() {
		let userList = this.state.users.length > 0 ? this.state.users.map((step, i) => {
			let user = this.state.users[i];
			return (
				<User user={this.state.users[i]} key={user.dob.date} />
			)
		}) : null;
		return (
			<div id='confetti-container'>
				<Confetti
					width={this.state.windowWidth}
					height={this.state.windowHeight}
					numberOfPieces={100}
					wind={0}
					colors={['#48C1EC', '#18518F', '#FFC0BD', '#D0021B', '#71DAE6', '#81E255', '#F5A623', '#F8E71C']}
					tweenDuration={200}
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
							<button id='sort-button' className={this.state.asc ? 'asc' : 'desc'}
								onClick={()=>this.sortUsers()}
							>
								Sort by birthday month {this.state.asc ? '(ASC)' : '(DESC)'}
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