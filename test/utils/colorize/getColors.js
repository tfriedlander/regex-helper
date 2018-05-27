import test from 'ava'
import { genColors } from '../../../src/utils/colorize'

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink']

test(
  'using default starting index will retrieve the first color in the list',
  t => t.is(genColors({ colors: COLORS })(), 'red')
)

test(
  'providing starting index will start the color off at that index',
  t => t.is(genColors({ startingIndex: 2, colors: COLORS })(), 'yellow')
)

test(
  'using a starting index greater than the length of the color array will start at 0',
  t => t.is(genColors({ startingIndex: 1234123423, colors: COLORS })(), 'red')
)

test('will return the expected colors when iterating twice', t => {
  const array = [...COLORS, ...COLORS]
  const fn = genColors({ colors: COLORS })
  array.map(expectedColor => {
    t.is(fn(), expectedColor)
  })
})
