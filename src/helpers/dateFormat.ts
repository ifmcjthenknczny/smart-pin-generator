export const FOUR_DIGIT_FORMATS = ['YYYY', 'DDMM', 'MMDD'] as const
export const SIX_DIGIT_FORMATS = [
  'YYYYMM',
  'MMYYYY',
  'DDMMYY',
  'MMDDYY',
  'YYDDMM',
  'YYMMDD',
] as const
export const EIGHT_DIGIT_FORMATS = ['DDMMYYYY', 'MMDDYYYY', 'YYYYMMDD', 'YYYYDDMM'] as const

type FourDigitDateFormat = (typeof FOUR_DIGIT_FORMATS)[number]
type SixDigitDateFormat = (typeof SIX_DIGIT_FORMATS)[number]
type EightDigitDateFormat = (typeof EIGHT_DIGIT_FORMATS)[number]

export type DateFormat = FourDigitDateFormat | SixDigitDateFormat | EightDigitDateFormat
