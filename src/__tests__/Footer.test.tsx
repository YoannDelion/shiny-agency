import { fireEvent, screen } from '@testing-library/react'
import Footer from '../components/Footer'
import { render } from '../utils/test'

describe('Footer component', () => {
  it('should render without crash', async () => {
    render(<Footer />)
    const nightModeButton = screen.getByRole('button')
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
  })
})
