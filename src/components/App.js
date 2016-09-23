import React, { Component } from 'react';

import openingHoursMock from '../mock-data/openingHours.json';
import { getOpeningHours } from '../utils/renderOpeningHours';

require('../../style/style.css');

export default class App extends Component {
  render() {
    const openingHoursForWeek = getOpeningHours(openingHoursMock);
    return (
      <ol>
        {_.map(openingHoursForWeek, (openingHours, weekday) => {
          return <li key={weekday}>{weekday}: {openingHours}</li>;
        })}
      </ol>
    );
  }
}
