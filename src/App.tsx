import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import useStore from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_LANGUAGES } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect, useState } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

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

  const debounceFromText = useDebounce(fromText)

  useEffect(() => {
    if (debounceFromText === '') return
    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then((toText) => {
        if (toText === null) return
        setToText(toText)
      })
      .catch(() => {
        setToText('Error')
      })
  }, [debounceFromText, fromLanguage, toLanguage])

  const [isActionRunning, setIsActionRunning] = useState(false)

  const handleClipboard = () => {
    navigator.clipboard.writeText(toText)
  }

  const handleSpeak = () => {
    setIsActionRunning(true)
    const utterance = new SpeechSynthesisUtterance(toText)
    utterance.lang = VOICE_LANGUAGES[toLanguage]
    utterance.rate = 1
    utterance.onend = () => setIsActionRunning(false)
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1
        style={{
          color: 'black',
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}
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
        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE || loading}
            onClick={interChangeLanguages}
          >
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
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={toText}
                onChange={setToText}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  display: 'flex'
                }}
              >
                <Button variant='link' onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  disabled={isActionRunning}
                  onClick={handleSpeak}
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
