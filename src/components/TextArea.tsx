import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = {
  height: '200px',
  border: 'none',
  resize: 'none',
}

const getPlaceholer = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading === true) return 'Translating...'
  return 'Translation'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? { ...commonStyles, border: '1px solid #dadce0', borderRadius: '8px' }
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as={'textarea'}
      disabled={type === SectionType.To || loading}
      placeholder={getPlaceholer({ type, loading })}
      // @ts-expect-error style is not in the type definition
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}
