import { formatJobList, formatFetchParams } from '../pages/Results'

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

describe('The formatFetchParams', () => {
  it('should use the right format for param', () => {
    const expectedState = 'a1=answer1'
    expect(formatFetchParams({ 1: 'answer1' })).toEqual(expectedState)
  })
  it('should concatenate params with an &', () => {
    const expectedState = 'a1=answer1&a2=answer2'
    expect(formatFetchParams({ 1: 'answer1', 2: 'answer2' })).toEqual(expectedState)
  })
})
