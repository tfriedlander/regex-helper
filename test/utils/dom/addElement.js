import test from "ava"
import sinon from 'sinon'
import { createDoc, createdEl } from './helpers/createDoc'
import { addElement } from '../../../src/utils/dom'

test('calls body.appendChild once', t => {
  const element = createdEl()
  const document = createDoc(element)
  const { body: { appendChild } } = document
  addElement(element, document)
  t.true(appendChild.calledOnce)
})

test('calls body.appendChild with the element sent in', t => {
  const element = createdEl()
  const document = createDoc(element)
  addElement(element, document)
  t.true(document.body.appendChild.calledWith(element))
})
