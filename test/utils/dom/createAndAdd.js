import test from "ava"
import sinon from 'sinon'
import { createDoc, createdEl } from './helpers/createDoc'
import { createAndAdd } from '../../../src/utils/dom'

test('calls body.appendChild once with the created element', t => {
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  const { body: { appendChild } } = document
  createAndAdd({}, document)
  t.true(appendChild.calledOnceWith(expectedEl))
})


test('creates the expected element', t => {
  const expectedVals = { id: 'hi', element: 'div' }
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  const { createElement } = document
  createAndAdd(expectedVals, document)
  t.true(createElement.calledOnceWith(expectedVals.element))
})

test('creates the element with the expected id', t => {
  const expectedVals = { id: 'hi', element: 'div' }
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  createAndAdd(expectedVals, document)
  t.is(expectedEl.id, expectedVals.id)
})
