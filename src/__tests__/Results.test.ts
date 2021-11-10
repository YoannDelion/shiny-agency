import { formatJobList } from '../pages/Results'

describe('The formatJobList function', () => {
  it('shoul add a comma to a word', () => {
    const expectedState = 'item2,'
    expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
  })
  it('should not add a comma to the last element of the list', () => {
    const expectedState = 'dernier item'
    expect(formatJobList('dernier item', 3, 2)).toEqual(expectedState)
  })
})
