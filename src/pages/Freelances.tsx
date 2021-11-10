import styled from 'styled-components'
import Card from '../components/Card'
import { Loader } from '../components/Loader'
import useFetch from '../utils/hooks/useFetch'
import { useTheme } from '../utils/hooks/useTheme'
import colors from '../utils/style/colors'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default function Freelances() {
  const { theme } = useTheme()
  const { data, loading, error } = useFetch(`http://localhost:8000/freelances`)

  const freelancersList = data?.freelancersList

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {loading ? (
        <LoaderWrapper>
          <Loader theme={theme} />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelancersList.map((profile: any, index: any) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.job}
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  )
}
