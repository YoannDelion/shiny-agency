import { useContext } from 'react'
import { createGlobalStyle } from 'styled-components'
import { ThemeContext } from '../context'

interface StyledGlobalStyleType {
  isDarkMode: boolean
}

const StyledGlobalStyle = createGlobalStyle<StyledGlobalStyleType>`
  * {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  } 
  body {
    background-color : ${({ isDarkMode }) => (isDarkMode ? '#2f2e41' : 'white')}
  }
`

export default function GlobalStyle() {
  const { theme } = useContext(ThemeContext)

  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}
