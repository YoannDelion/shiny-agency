import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Freelances from '../pages/Freelances'
import { render } from '../utils/test'

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

describe('Freelances component', () => {
  it('should display freelancers names', async () => {
    render(<Freelances />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    await waitFor(() => {
      expect(screen.getByText('Harry Potter')).toBeTruthy()
      expect(screen.getByText('Hermione Granger')).toBeTruthy()
    })
  })

  it('should display error content', async () => {
    server.use(
      rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            errorMessage: 'Oups, il y a eu une erreur',
          })
        )
      })
    )
    render(<Freelances />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByTestId('error')).toMatchInlineSnapshot(`
      <span
        data-testid="error"
      >
        Oups, il y a eu une erreur
      </span>
    `)
  })
})
