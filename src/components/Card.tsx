import styled from 'styled-components'
import colors from '../utils/style/colors'
import DefaultPicture from '../assets/profile.png'
import { useState } from 'react'
import { useTheme } from '../utils/hooks/useTheme'

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`

const CardImg = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`

interface PropsTypes {
  label: string
  title: string
  picture?: string
}

export default function Card({ label, title, picture = DefaultPicture }: PropsTypes) {
  const { theme } = useTheme()
  const [isFavorite, setIsFavorite] = useState(false)
  const star = isFavorite ? '⭐' : ''

  return (
    <CardContainer theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImg src={picture} alt='freelance' />
      <CardTitle theme={theme}>
        {star} {title} {star}
      </CardTitle>
    </CardContainer>
  )
}
