import test from "ava"
import { createElement } from '../../../src/utils/dom'
import { createDoc, createdEl } from './helpers/createDoc'

test('returns the element created by document.createElement', t => {
  const expectedEl = createdEl()
  const document = createDoc(expectedEl)
  const results = createElement({ id: 'hi', element: 'div' }, document)
  t.deepEqual(expectedEl, results)
})
