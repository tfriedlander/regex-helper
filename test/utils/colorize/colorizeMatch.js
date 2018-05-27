import test from 'ava'
import { colorizeMatch, genColors } from '../../../src/utils/colorize'

test.beforeEach(t => {
  const startingIndex = -1
  const colors = ['red', 'green', 'blue', 'yellow', 'pink']
  const getColor = genColors({ startingIndex, colors })
  t.context = { getColor }
})

test('returns colorized match when no groups present', t => {
  const { getColor } = t.context
  const matched = 'Hello everybody'
  const groups = []
  const expected = `<span style="color: red;">${matched}</span>`
  const match = { matched, groups }
  t.is(colorizeMatch(match, getColor), expected)
})

test('returns colorized group inside of match', t => {
  const { getColor } = t.context
  const matched = 'Hello everybody'
  const groups = ['e']
  const expected = `<span style="color: red;">H<span style="color: green; font-weight: bold;">e</span>llo everybody</span>`
  const match = { matched, groups }
  t.is(colorizeMatch(match, getColor), expected)
})

test('returns colorized groups inside of match', t => {
  const { getColor } = t.context
  const matched = 'Hello everybody'
  const groups = ['e', 'e', 'o']
  const expected = [
    '<span style="color: red;">',
    'H',
    '<span style="color: green; font-weight: bold;">e</span>',
    'llo ',
    '<span style="color: blue; font-weight: bold;">e</span>',
    'veryb',
    '<span style="color: yellow; font-weight: bold;">o</span>',
    'dy</span>'
  ].join('')
  const match = { matched, groups }
  t.is(colorizeMatch(match, getColor), expected)
})
