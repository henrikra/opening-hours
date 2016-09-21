import React, { Component } from 'react';

import openingHoursMock from '../mock-data/openingHours.json';
import { openingHoursForWeek } from '../utils/renderOpeningHours';

require('../../style/style.css');

export default class App extends Component {
  render() {
    const openingHoursForWeek = openingHoursForWeek(openingHoursMock);
    return (
      <ul>
        {openingHoursForWeek.map(weekdayOpeningHours => <li>{weekdayOpeningHours}</li>)}
      </ul>
    );
  }
}
