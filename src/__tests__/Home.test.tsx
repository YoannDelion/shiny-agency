import { screen } from '@testing-library/react'
import Home from '../pages/Home'
import { render } from '../utils/test'

describe('Home component', () => {
  it('should render title', () => {
    render(<Home />)
    // screen.debug() to display what is rendered
    expect(
      screen.getByRole('heading', {
        level: 2,
        text: 'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents',
      })
    ).toBeTruthy()
  })
})
