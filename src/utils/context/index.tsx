import { createContext, useState } from 'react'

interface ProviderPropsType {
  children: React.ReactNode
}

type ThemeType = 'light' | 'dark'

const defaultThemeContext = {
  theme: 'light',
  toggleTheme: () => {},
}

export const ThemeContext = createContext(defaultThemeContext)

export const ThemeProvider = ({ children }: ProviderPropsType) => {
  const [theme, setTheme] = useState<ThemeType>('light')

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

type AnswerType = any

const defaultSurveyContext = {
  answers: {},
  saveAnswers: (newAnswer: AnswerType) => {},
}

// TODO: fix any type
export const SurveyContext = createContext<any>(defaultSurveyContext)

export const SurveyProvider = ({ children }: ProviderPropsType) => {
  const [answers, setAnswers] = useState<any>({})

  const saveAnswers = (newAnswer: AnswerType) => {
    setAnswers((answers: any) => ({ ...answers, ...newAnswer }))
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>{children}</SurveyContext.Provider>
  )
}
