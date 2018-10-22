import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.day} {this.props.date} </h1>

        <div className="card">
          <div className="row">
            <img alt="{this.props.text}" src={`http://l.yimg.com/a/i/us/we/52/${this.props.conditionCode}.gif`} />
            <span className="condition-text">{this.props.text}</span>
          </div>

          <div className="row temp-info">
            <p><strong>High: </strong>{this.props.high} &#8451;</p>
            <p><strong>Low: </strong>{this.props.low} &#8451;</p>
          </div>
        </div>

      </div>
    );
  }
}

export default Day;
