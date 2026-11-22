const SKIP_MAP = new Map<string, number>([
  ['1,3', 2],
  ['4,6', 5],
  ['7,9', 8],
  ['1,7', 4],
  ['2,8', 5],
  ['3,9', 6],
  ['1,9', 5],
  ['3,7', 5],
])

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function chooseRandomly<T>(array: T[]) {
  const index = randomInt(0, array.length - 1)
  return array[index]!
}

const MIN_PATTERN_FIELD_INDEX = 1

export function generatePattern(patternSize: number = 4, length?: number): number[] {
  const maxPatternFieldIndex = patternSize ** 2
  const targetLength = length ?? randomInt(2, maxPatternFieldIndex)

  if (!Number.isInteger(targetLength) || targetLength < 2 || targetLength > maxPatternFieldIndex) {
    // TODO: replace with zod
    throw new RangeError('Pattern length must be in range from 2 to 9.')
  }

  while (true) {
    const start = randomInt(MIN_PATTERN_FIELD_INDEX, maxPatternFieldIndex)
    const pattern = [start]
    const visitedFields = new Set<number>([start])

    while (pattern.length < targetLength) {
      const current = pattern[pattern.length - 1]!
      const candidates: number[] = []

      // wtf co robi tu next
      for (let nxt = MIN_PATTERN_FIELD_INDEX; nxt <= maxPatternFieldIndex; nxt++) {
        if (visitedFields.has(nxt)) {
          continue
        }
        const skipMapKey = [current, nxt].toSorted().join(',')

        const requiredMiddleFieldIndex = SKIP_MAP.get(skipMapKey)
        if (requiredMiddleFieldIndex === undefined || visitedFields.has(requiredMiddleFieldIndex)) {
          candidates.push(nxt)
        }
      }

      if (candidates.length === 0) {
        break
      }

      const nxt = chooseRandomly(candidates)
      pattern.push(nxt)
      visitedFields.add(nxt)
    }

    if (pattern.length === targetLength) {
      return pattern
    }
  }
}
