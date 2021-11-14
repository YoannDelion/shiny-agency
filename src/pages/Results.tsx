import { useContext } from 'react'
import styled from 'styled-components'
import { Loader } from '../components/Loader'
import { StyledLink } from '../components/StyledLink'
import { SurveyContext } from '../utils/context'
import useFetch from '../utils/hooks/useFetch'
import { useTheme } from '../utils/hooks/useTheme'
import colors from '../utils/style/colors'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const JobTitle = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : colors.backgroundLight)};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export function formatFetchParams(answers: any) {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0
    const separator = isFirstParam ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

export function formatJobList(title: string, listLength: number, index: number) {
  if (index === listLength - 1) {
    return title
  }
  return `${title},`
}

export default function Results() {
  const { theme } = useTheme()
  const { answers } = useContext(SurveyContext)
  const fetchParams = formatFetchParams(answers)

  const { data, loading, error } = useFetch(`http://localhost:8000/results?${fetchParams}`)

  if (error) {
    return <span data-testid='error'>{error}</span>
  }

  const resultsData = data?.resultsData

  return loading ? (
    <LoaderWrapper>
      <Loader data-testid='loader' />
    </LoaderWrapper>
  ) : (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        Les compétences dont vous avez besoin :
        {resultsData &&
          resultsData.map((result: any, index: any) => (
            <JobTitle key={`result-title-${index}-${result.title}`} theme={theme}>
              {formatJobList(result.title, resultsData.length, index)}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink $isFullLink to='/freelances'>
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result: any, index: any) => (
            <JobDescription theme={theme} key={`result-detail-${index}-${result.title}`}>
              <JobTitle theme={theme}>{result.title}</JobTitle>
              <p>{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  )
}
