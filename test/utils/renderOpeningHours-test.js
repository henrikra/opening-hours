import { expect } from 'chai';

import { renderOpeningHours } from '../../src/utils/renderOpeningHours';

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
});