import test from "ava"
import { createdEl } from './helpers/createDoc'
import { setAttributes } from '../../../src/utils/dom'

test('sets the attributes sent in when only one pair set', t => {
  const expected = { id: 'hi' }
  const el = createdEl()
  const { setAttribute, ...results } = setAttributes(el, expected)
  t.deepEqual(expected, results)
})

test('sets multiple attributes sent in when multiple pairs set', t => {
  const expected = { id: 'hi', name: 'bobby' }
  const el = createdEl()
  const { setAttribute, ...results } = setAttributes(el, expected)
  t.deepEqual(expected, results)
})

test('does not set anything when no attributes sent in', t => {
  const expected = {}
  const el = createdEl()
  const { setAttribute, ...results } = setAttributes(el)
  t.deepEqual(expected, results)
})
