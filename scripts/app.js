"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

let LeadersTable = React.createClass({
  getLastMonth: function () {
	axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
	.then((response) => {
      this.setState({
    		results: response.data,
    		lastMonthOrder: 'visible',
    		allTimeOrder: 'hidden'
  	  });
    });
  },
  getAllTime: function () {
	axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
	.then((response) => {
      this.setState({
    		results: response.data,
    		lastMonthOrder: 'hidden',
    		allTimeOrder: 'visible'
  	  });
    });
  },
  getInitialState: function () {
  	return {
  	  results: new Array(100),
  	  lastMonthOrder: 'visible',
  	  allTimeOrder: 'hidden'
  	};
  },
  componentDidMount: function () {
    this.getLastMonth();
  },
  render: function () {
  	let data = this.state.results.map((item, i) =>
  	  <tr>
  	    <td className="position"><p>{i+1}</p></td>
  	    <td className="user"><img src={item.img}/>{item.username}</td>
  	    <td className="last-month">{item.recent}</td>
  	    <td className="all-time">{item.alltime}</td>
  	  </tr>
  	);
    return (
  	  <div>
  		<h1><i className="fa fa-free-code-camp" aria-hidden="true"></i> FCC Leaderboard</h1>
  		<table>
  		  <tr>
  	      <th className="position"></th>
  		    <th className="user"></th>
  		    <th className="last-month" onClick={this.getLastMonth}>Last month points<span style={{visibility: this.state.lastMonthOrder}}>▼</span></th>
  			  <th className="all-time" onClick={this.getAllTime}>All-time points<span style={{visibility: this.state.allTimeOrder}}>▼</span></th>
  		  </tr>
  		  {data}
  		</table>
  	  </div>
    );
  }
});

ReactDOM.render(<LeadersTable />, document.getElementById('app'));
