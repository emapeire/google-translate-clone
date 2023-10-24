import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import useStore from './hooks/useStore'
import { AUTO_LANGUAGE } from './utils/constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setToText
  } = useStore()

  return (
    <Container fluid>
      <h1
        style={{ color: 'black', fontSize: '24px', textAlign: 'center', marginBottom: '24px' }}
      >
        Google Translate
      </h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interChangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={toText}
              onChange={setToText}
            />
          </Stack>
        </Col>
      </Row>
    </Container >
  )
}

export default App
