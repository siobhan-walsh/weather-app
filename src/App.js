import React, { Component } from 'react';
import axios from 'axios';
import Day from './Day.js';
import './App.css';
// Also using yahoo's weather api: https://developer.yahoo.com/weather/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      city: "vancouver, bc",
      forecastDays: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  componentDidMount() {
    this.getForecast(this.state.city);
  }

  handleChange(e) {
    this.setState({city: e.target.value});
    this.getForecast(e.target.value);
  }

  getForecast(city) {
    this.setState({loading: true});
    const url = `https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}') and u='c'`;

    axios.get(url).then(
      (response) => {
        this.setState({forecastDays: response.data.query.results.channel.item.forecast});
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    ).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    return (
      <div className="content">

        <div className="header">
          <span className="city-label">City:</span>
          <select value={this.state.city} onChange={this.handleChange}>
            <option value="vancouver, bc">Vancouver</option>
            <option value="edmonton">Edmonton</option>
            <option value="regina">Regina</option>
            <option value="winnipeg">Winnipeg</option>
            <option value="toronto">Toronto</option>
          </select>
        </div>

        {this.state.loading
          ? (
            <img alt="loader" className="loading-img" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif"/>
          )

          : (
            <div>
              {this.state.forecastDays.map(day =>
                  <Day
                    key={day.date}
                    day={day.day}
                    date={day.date}
                    high={day.high}
                    low={day.low}
                    text={day.text}
                    conditionCode={day.code}
                  />
                )
              }
          </div>
        )
      }
    </div>
    );
  }
}

export default App;
