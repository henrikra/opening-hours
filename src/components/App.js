import React, { Component } from 'react';

import openingHoursMock from '../mock-data/openingHours.json';
import { simpleOpeningHours } from '../utils/renderOpeningHours';

require('../../style/style.css');

export default class App extends Component {
  render() {
    const openingHoursForWeek = simpleOpeningHours(openingHoursMock);
    return (
      <pre>
        {openingHoursForWeek}
      </pre>
    );
  }
}
