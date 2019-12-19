import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';

class BirthdayList extends React.Component {

  render() {
    return (
        <h1>Birthday Tracker</h1>
    );
  };
}


// ========================================

ReactDOM.render(
    <BirthdayList />,
    document.getElementById('root')
);

export default BirthdayList;