import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import useStore from './hooks/useStore'
import { AUTO_LANGUAGE } from './utils/constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'

function App() {
  const { fromLanguage, toLanguage, interChangeLanguages, setFromLanguage, setToLanguage } = useStore()
  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </Col>
        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interChangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
