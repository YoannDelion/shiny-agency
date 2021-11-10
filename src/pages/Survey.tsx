import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../components/Loader'
import { SurveyContext } from '../utils/context'
import useFetch from '../utils/hooks/useFetch'
import colors from '../utils/style/colors'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button<{ isSelected: boolean }>`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none')};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: row;
`

interface QuestionType {
  id: number
  question: string
}

export default function Survey() {
  const { id } = useParams()
  const questionId = parseInt(id || '1')
  const { answers, saveAnswers } = useContext(SurveyContext)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)

  const { data, loading, error } = useFetch('http://localhost:8000/survey')
  const questions = data?.surveyData

  useEffect(() => {
    const question = questions?.find((question: any) => question.id === questionId)
    setCurrentQuestion(question || null)
  }, [questions, questionId])

  const isThereNextQuestion = () => {
    const nextQuestion = questions?.find((question: any) => question.id === questionId + 1)
    return !!nextQuestion
  }

  const saveReply = (answer: boolean) => {
    saveAnswers({ [questionId]: answer })
  }

  if (error) {
    return <span>Oups, il y a eu un problème !</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionId}</QuestionTitle>
      {loading ? <Loader /> : <QuestionContent>{currentQuestion?.question}</QuestionContent>}
      <ReplyContainer>
        <ReplyBox onClick={() => saveReply(true)} isSelected={answers[questionId] === true}>
          Oui
        </ReplyBox>
        <ReplyBox onClick={() => saveReply(false)} isSelected={answers[questionId] === false}>
          Non
        </ReplyBox>
      </ReplyContainer>
      <LinkWrapper>
        {questionId !== 1 && <Link to={`/survey/${questionId - 1}`}>Précédent</Link>}
        {isThereNextQuestion() ? (
          <Link to={`/survey/${questionId + 1}`}>Suivant</Link>
        ) : (
          <Link to='/results'>Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}
