import React, { Component } from 'react';

import openingHoursMock from '../mock-data/openingHours.json';
import { simpleOpeningHours } from '../utils/renderOpeningHours';

require('../../style/style.css');

export default class App extends Component {
  render() {
    const openingHoursForWeek = simpleOpeningHours(openingHoursMock);
    return (
      <ol>
        {_.map(openingHoursForWeek, (openingHours, weekday) => {
          return <li key={weekday}>{weekday}: {openingHours}</li>;
        })}
      </ol>
    );
  }
}
