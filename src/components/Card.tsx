import styled from 'styled-components'
import colors from '../utils/style/colors'
import DefaultPicture from '../assets/profile.png'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 350px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

const CardLabel = styled.span`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: bold;
`

const CardImg = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
`
interface PropsTypes {
  label: string
  title: string
  picture?: string
}

export default function Card({ label, title, picture = DefaultPicture }: PropsTypes) {
  return (
    <CardContainer>
      <CardLabel>{label}</CardLabel>
      <CardImg src={picture} alt='freelance' />
      <span>{title}</span>
    </CardContainer>
  )
}
