import test from 'ava'
import { colorizeText, genColors } from '../../../src/utils/colorize'

test.beforeEach(t => {
  const startingIndex = -1
  const colors = ['red', 'green', 'blue', 'yellow', 'pink']
  const getColor = genColors({ startingIndex, colors })
  t.context = { getColor }
})

test('wraps a span with black color around text without matches', t => {
  const { getColor } = t.context
  const text = 'Hello everybody'
  const expected = `<span style="color: #000;">${text}</span>`
  t.is(colorizeText(text, [], { getColor }), expected)
})

test('colorizes text with one match with no groups as expected', t => {
  const { getColor } = t.context
  const text = 'Hello everybody'
  const matches = [ { matched: 'Hello', groups: [], index: 0 } ]
  const expected = '<span style="color: #000;"><span style="color: red;">Hello</span> everybody</span>'
  t.is(colorizeText(text, matches, { getColor }), expected)
})

test('colorizes text with two matches with no groups as expected', t => {
  const { getColor } = t.context
  const text = 'Hello everybody'
  const matches = [
    { matched: 'Hello', groups: [], index: 0 },
    { matched: 'body', groups: [], index: 11 },
  ]
  const expected = '<span style="color: #000;"><span style="color: red;">Hello</span> every<span style="color: green;">body</span></span>'
  t.is(colorizeText(text, matches, { getColor }), expected)
})

test('colorizes text with one match with one group as expected', t => {
  const { getColor } = t.context
  const text = 'Hello everybody'
  const matches = [
    { matched: 'Hello', groups: ['e'], index: 0 },
  ]
  const expected = '<span style="color: #000;"><span style="color: red;">H<span style="color: green; font-weight: bold;">e</span>llo</span> everybody</span>'
  t.is(colorizeText(text, matches, { getColor }), expected)
})

test('colorizes text with two matches with one group as expected', t => {
  const { getColor } = t.context
  const text = 'Hello everybody'
  const matches = [
    { matched: 'Hello', groups: ['e'], index: 0 },
    { matched: 'body', groups: ['o'], index: 11 },
  ]
  const expected = '<span style="color: #000;"><span style="color: red;">H<span style="color: green; font-weight: bold;">e</span>llo</span> every<span style="color: blue;">b<span style="color: yellow; font-weight: bold;">o</span>dy</span></span>'
  t.is(colorizeText(text, matches, { getColor }), expected)
})

test.only('colorizes text with groups as expected', t => {
  const { getColor } = t.context
  const text = 'Hello everybody how are you doing today?'
  const matches = [{'matched':'el','groups':['l'],'index':1},{'matched':'ev','groups':['v'],'index':6},{'matched':'er','groups':['r'],'index':8},{'matched':'e ','groups':[' '],'index':22}]
  const expected = [
    '<span style="color: #000;">',
    'H',
    '<span style="color: red;">e',
    '<span style="color: green; font-weight: bold;">l</span>',
    '</span>',
    'lo ',
    '<span style="color: blue;">e',
    '<span style="color: yellow; font-weight: bold;">v</span>',
    '</span>',
    '<span style="color: pink;">e',
    '<span style="color: red; font-weight: bold;">r</span>',
    '</span>',
    'ybody how ar',
    '<span style="color: green;">e',
    '<span style="color: blue; font-weight: bold;"> </span>',
    '</span>',
    'you doing today?',
    '</span>',
  ].join('')
  const results = colorizeText(text, matches, { getColor })
  t.is(results, expected)
})
