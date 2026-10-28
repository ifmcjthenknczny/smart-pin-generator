import { EIGHT_DIGIT_FORMATS, FOUR_DIGIT_FORMATS, SIX_DIGIT_FORMATS } from './dateFormat'
import { isValidDate } from './isValidDate'

function toMonocity(digit1?: number, digit2?: number) {
  if (digit1 === undefined || digit2 === undefined) {
    throw new Error('Pin digit is not a number')
  }
  return digit2 > digit1 ? 'ASC' : 'DESC'
}

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

export function isPinNonTrivial(pin: string): boolean {
  const digitsCount = pin.length
  const pinDigits = pin.split('').map(Number)

  if (pinDigits.length < digitsCount) {
    return false
  }

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

  const digitsMonotonicity = pinDigits
    .slice(0, -1)
    .map((_, i) => toMonocity(pinDigits[i], pinDigits[i + 1]))

  if (
    digitsMonotonicity.every((monotonicity) => monotonicity === 'ASC') ||
    digitsMonotonicity.every((monotonicity) => monotonicity === 'DESC')
  ) {
    return false
  }

  const isDatelike = isPinValidDate(pin)
  if (isDatelike) {
    return false
  }

  return true
}
