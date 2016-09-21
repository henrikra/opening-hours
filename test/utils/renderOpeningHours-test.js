import { expect } from 'chai';

import { renderOpeningHours, openingHoursForWeek } from '../../src/utils/renderOpeningHours';

describe('renderOpeningHours', () => {
  it('contains weekday starting with capital letter', () => {
    expect(renderOpeningHours('monday', [])).to.include('Monday');
  });

  it('contains Closed when opening hours is empty', () => {
    expect(renderOpeningHours('monday', [])).to.include('Closed');
  });

  it('prints even hours', () => {
    const openingHours = [
      {type: 'open', value: 36000},
      {type: 'close', value: 64800}
    ];
    expect(renderOpeningHours('tuesday', openingHours)).to.equal('Tuesday: 10 am - 6 pm');
  });

  it('prints even hours', () => {
    const openingHours = [
      {type: 'open', value: 36010},
      {type: 'close', value: 43199}
    ];
    expect(renderOpeningHours('tuesday', openingHours)).to.equal('Tuesday: 10.00:10 am - 11.59:59 am');
  });

  it('prints multiple opening hours', () => {
    const openingHours = [
      {type: "open", value: 32400},
      {type: "close", value: 39600},
      {type: "open", value: 57600},
      {type: "close", value: 82800}
    ];
    expect(renderOpeningHours('tuesday', openingHours)).to.equal('Tuesday: 9 am - 11 am, 4 pm - 11 pm');
  });
});

describe('openingHoursForWeek', () => {
  it('return array of right opening hours', () => {
    const openingHoursFullWeek = {
      monday: [],
      tuesday: [
        {type: 'open', value: 36000},
        {type: 'close', value: 64800}
      ],
      wednesday: [],
      thursday: [
        {type: 'open', value: 32400},
        {type: 'close', value: 72000}
      ],
      friday: [
        {type: 'open', value: 32400},
        {type: 'close', value: 72000}
      ],
      saturday: [
        {type: 'open', value: 32400},
        {type: 'close', value: 72000}
      ],
      sunday: [
        {type: 'open', value: 32400},
        {type: 'close', value: 72000}
      ]
    };
    expect(openingHoursForWeek(openingHoursFullWeek)).deep.equal([
      'Monday: Closed',
      'Tuesday: 10 am - 6 pm',
      'Wednesday: Closed',
      'Thursday: 9 am - 8 pm',
      'Friday: 9 am - 8 pm',
      'Saturday: 9 am - 8 pm',
      'Sunday: 9 am - 8 pm'
    ]);
  });
});