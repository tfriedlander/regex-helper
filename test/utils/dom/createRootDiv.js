import test from "ava"
import sinon from 'sinon'
import { createDoc, createdEl } from './helpers/createDoc'
import { createRootDiv } from '../../../src/utils/dom'

test('calls body.appendChild once with the created element', t => {
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  const { body: { appendChild } } = document
  createRootDiv({}, document)
  t.true(appendChild.calledOnceWith(expectedEl))
})

test('creates the expected element', t => {
  const id = 'root'
  const element = 'div'
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  const { createElement } = document
  createRootDiv({}, document)
  t.true(createElement.calledOnceWith(element))
})

test('creates the element with the expected id', t => {
  const id = 'root'
  const element = 'div'
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  createRootDiv({}, document)
  t.is(expectedEl.id, id)
})

test('creates the element with the expected additional attrs', t => {
  const id = 'root'
  const element = 'div'
  const name = 'bob'
  const attrs = { name }
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  createRootDiv(attrs, document)
  t.is(expectedEl.name, name)
})
