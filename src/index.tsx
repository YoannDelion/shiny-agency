import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import Footer from './components/Footer'
import Header from './components/Header'
import Freelances from './pages/Freelances'
import Home from './pages/Home'
import Results from './pages/Results'
import Survey from './pages/Survey'
import { SurveyProvider, ThemeProvider } from './utils/context'
import GlobalStyle from './utils/style/GlobalStyle'

// TODO: Regroup Providers

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/survey/:id' element={<Survey />} />
            <Route path='/results' element={<Results />} />
            <Route path='/freelances' element={<Freelances />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
