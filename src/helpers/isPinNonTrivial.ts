import { EIGHT_DIGIT_FORMATS, FOUR_DIGIT_FORMATS, SIX_DIGIT_FORMATS } from './dateFormat'
import { isValidDate } from './isValidDate'

function isPinValidDate(pin: string) {
  const digitsCount = String(pin).length

  if (digitsCount === 4) {
    return FOUR_DIGIT_FORMATS.map((dateFormat) => isValidDate(pin, dateFormat)).some(
      (validity) => validity === true,
    )
  }

  if (digitsCount === 6) {
    return SIX_DIGIT_FORMATS.map((dateFormat) => isValidDate(pin, dateFormat)).some(
      (validity) => validity === true,
    )
  }

  if (digitsCount === 8) {
    return EIGHT_DIGIT_FORMATS.map((dateFormat) => isValidDate(pin, dateFormat)).some(
      (validity) => validity === true,
    )
  }

  return false
}

function hasSequentialDigits(pin: string, consecutiveThreshold: number) {
  const ASC_SEQUENCE = '0123456789'
  const DESC_SEQUENCE = '9876543210'

  for (let i = 0; i <= pin.length - consecutiveThreshold; i++) {
    const sub = pin.substring(i, i + consecutiveThreshold)

    if (ASC_SEQUENCE.includes(sub) || DESC_SEQUENCE.includes(sub)) {
      return true
    }
  }

  return false
}

type IsPinNonTrivialOptions = {
  consecutiveThreshold: number
}

export function isPinNonTrivial(pin: string, { consecutiveThreshold }: IsPinNonTrivialOptions) {
  const pinDigits = pin.split('').map(Number)

  const firstDigit = pinDigits[0]
  if (firstDigit === 0) {
    return false
  }

  const lastDigit = pinDigits[pinDigits.length - 1]
  if (lastDigit === 0 || lastDigit === 5) {
    return false
  }

  const hasUniqueDigits = new Set(pinDigits).size === pinDigits.length
  if (!hasUniqueDigits) {
    return false
  }

  const digitsDifference = pinDigits.slice(0, -1).map((_, i) => {
    const current = pinDigits[i]
    const next = pinDigits[i + 1]

    if (current === undefined || next === undefined) {
      return 0
    }

    return next - current
  })
  const isMonotonic =
    digitsDifference.every((diff) => diff > 0) || digitsDifference.every((diff) => diff < 0)
  if (isMonotonic) {
    return false
  }

  const isDatelike = isPinValidDate(pin)
  if (isDatelike) {
    return false
  }

  const isSequentialLike = hasSequentialDigits(pin, consecutiveThreshold)
  if (isSequentialLike) {
    return false
  }

  return true
}
