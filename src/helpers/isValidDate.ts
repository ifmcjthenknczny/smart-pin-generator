import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { DateFormat } from './dateFormat'

dayjs.extend(customParseFormat)

const VALID_YEAR_RANGE = {
  min: 1900,
  max: 2100,
}

type ParsedDate = {
  year: number | null
  month: number | null
  day: number | null
}

export function isValidDate(value: string, format: DateFormat) {
  const { year, month, day } = parseDateFromFormat(value, format)

  if (year === null || month === null || day === null) {
    return false
  }

  const isYearBetweenMinMax = year >= VALID_YEAR_RANGE.min && year <= VALID_YEAR_RANGE.max

  if (!isYearBetweenMinMax) {
    return false
  }

  const dateString = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`

  return dayjs(dateString, 'DDMMYYYY', true).isValid()
}

const parseDatePart = (token: string, value: string): [string, number] => {
  const parsedValue = Number(value)

  switch (token) {
    case 'YYYY':
      return ['year', parsedValue]
    case 'YY':
      return ['year', parseYear(parsedValue)]
    case 'MM':
      return ['month', parsedValue]
    case 'DD':
      return ['day', parsedValue]
    default:
      throw new Error(`Unsupported date token: ${token}`)
  }
}

const parseDateFromFormat = (value: string, format: DateFormat): ParsedDate => {
  if (format.length !== value.length) {
    throw new Error('Format is not valid for provided value')
  }

  const tokens = format.match(/YYYY|YY|MM|DD/g)!

  let offset = 0

  return Object.fromEntries(
    tokens.map((token) => {
      const part = value.slice(offset, offset + token.length)
      offset += token.length

      return parseDatePart(token, part)
    }),
  ) as ParsedDate
}

function parseYear(yy: number): number {
  const currentYear = dayjs().year()
  const currentYearYY = Number(String(currentYear).slice(2, 4))
  return yy < currentYearYY ? 2000 + yy : 1900 + yy
}
