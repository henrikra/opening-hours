import { expect } from 'chai';

import { getOpeningHours } from '../../src/utils/renderOpeningHours';

describe('getOpeningHours', () => {
  it('returns array of right opening hours', () => {
    const openingHoursFullWeek = {
      monday: [],
      tuesday: [
        {type: 'open', value: 36000},
        {type: 'close', value: 64800}
      ],
      wednesday: [],
      thursday: [
        {type: 'open', value: 28800}
      ],
      friday: [
        {type: 'close', value: 5400},
        {type: 'open', value: 32400},
      ],
      saturday: [
        {type: 'close', value: 7200},
        {type: 'open', value: 7200},
        {type: 'close', value: 75600}
      ],
      sunday: [
        {type: 'open', value: 32400},
        {type: 'close', value: 72000}
      ]
    };
    expect(getOpeningHours(openingHoursFullWeek)).deep.equal({
      Monday: 'Closed',
      Tuesday: '10 am - 6 pm',
      Wednesday: 'Closed',
      Thursday: '8 am - 1.30 am',
      Friday: '9 am - 2 am',
      Saturday: '2 am - 9 pm',
      Sunday: '9 am - 8 pm'
    });
  });

  it('returns week with less than 7 days', () => {
    const openingHoursFullWeek = {
      friday: [ 
        {type: "open", value: 64800}
      ],
      saturday: [
        {type: "close", value: 3600},
        {type: "open", value: 32400},
        {type: "close", value: 39600},
        {type: "open", value: 57600},
        {type: "close", value: 82800}
      ]
    };
    expect(getOpeningHours(openingHoursFullWeek)).deep.equal({
      Friday: '6 pm - 1 am',
      Saturday: '9 am - 11 am, 4 pm - 11 pm'
    });
  });

  it('returns example data in assignment right way', () => {
    const openingHoursFullWeek = {
      monday: [],
      tuesday: [ 
        {type: "open", value: 36000}, 
        {type: "close", value: 64800},
        {type: "open", value: 82800}, 
        {type: "close", value: 84600}
      ],
      wednesday: [],
      thursday: [ 
        {type: "open", value: 36000}, 
        {type: "close", value: 64800}
      ],
      friday: [ 
        {type: "open", value: 36000} 
      ],
      saturday: [ 
        {type: "close", value: 3600},
        {type: "open", value: 36000}
      ],
      sunday: [
        {type: "close", value: 3600},
        {type: "open", value: 43200}, 
        {type: "close", value: 75600}
      ]
    };
    expect(getOpeningHours(openingHoursFullWeek)).deep.equal({
      Monday: 'Closed',
      Tuesday: '10 am - 6 pm, 11 pm - 11.30 pm',
      Wednesday: 'Closed',
      Thursday: '10 am - 6 pm',
      Friday: '10 am - 1 am',
      Saturday: '10 am - 1 am',
      Sunday: '12 pm - 9 pm'
    });
  });
});