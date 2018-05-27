import test from 'ava'
import { getMatches } from '../../../src/utils/matches'

test('returns empty array when no matches found', t => {
  const text = 'Hello everybody'
  const regex = /z/
  t.deepEqual(getMatches(text, regex), [])
})

test('returns array with one entry when only one match found', t => {
  const text = 'Hello everybody'
  const regex = /Hello/
  t.is(getMatches(text, regex).length, 1)
})

test('returns array with two entries when two matches found with global flag', t => {
  const text = 'Hello everybody'
  const regex = /o/g
  t.is(getMatches(text, regex).length, 2)
})

test('returns array with one entry when two matches found without global flag', t => {
  const text = 'Hello everybody'
  const regex = /o/
  t.is(getMatches(text, regex).length, 1)
})

test('returns expected `matched` value as full match', t => {
  const text = 'Hello everybody'
  const regex = /Hello/
  const [ { matched } ] = getMatches(text, regex)
  t.is(matched, 'Hello')
})

test('returns expected empty groups array when regex has no groups', t => {
  const text = 'Hello everybody'
  const regex = /Hello/
  const [ { groups } ] = getMatches(text, regex)
  t.deepEqual(groups, [])
})

test('returns index of first char in match', t => {
  const text = 'Hello everybody'
  const regex = /everybody/
  const [ { index } ] = getMatches(text, regex)
  t.is(index, 6)
})

test('returns array of expected groups when regex has groups', t => {
  const text = 'Hello everybody'
  const regex = /H(e)(l)l(o)/
  const expected = ['e','l','o']
  const [ { groups } ] = getMatches(text, regex)
  t.deepEqual(groups, expected)
})
