import { isPinNonTrivial } from './isPinNonTrivial'

export const DIGITS_COUNT = {
  default: 4,
  min: 4,
  max: 10,
}

export function generatePin(digitsCount: number, shouldBeNonTrivial: boolean = true) {
  // TODO: validate by zod
  if (digitsCount < DIGITS_COUNT.min || digitsCount > DIGITS_COUNT.max) {
    throw new Error(
      `Digits count in pin must be between ${DIGITS_COUNT.min} and ${DIGITS_COUNT.max}`,
    )
  }

  let pin = randomizePin(digitsCount)

  if (shouldBeNonTrivial === false) {
    return padStartZero(pin, digitsCount)
  }

  let isTrivial = true

  while (isTrivial) {
    pin = randomizePin(digitsCount)
    isTrivial = !isPinNonTrivial(pin)
  }

  return padStartZero(pin, digitsCount)
}

function randomizePin(digitsCount: number = DIGITS_COUNT.default) {
  return padStartZero(`${Math.floor(Math.random() * Math.pow(10, digitsCount))}`, digitsCount)
}

function padStartZero(pin: string, digitsCount: number) {
  return pin.padStart(digitsCount, '0')
}
