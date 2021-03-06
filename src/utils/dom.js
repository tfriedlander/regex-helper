/* global document window */
/**
 * @module utils/dom.js
 *
 * A set of utility functions for DOM manipulation. This breaks the functional
 * component rules by allowing manipulation of the arguments sent in intentionally
 * to allow manipulation of DOM elements sent in
 */

// typeof for tests (when run not in a browser)
const doc = typeof document !== 'undefined' ? document : {}

/**
 * sets multiple attributes with one call for a DOM element
 * @param {Object} el - DOM element to set attributes on
 * @param {Object} [attributes={}] - key/value pair of attributes to set
 * @return {Object} DOM element (same as one sent in) with attributes set
 */
function setAttributes(el, attributes = {}) {
  Object.keys(attributes).map((key) => {
    el.setAttribute(key, attributes[key])
    return key
  })
  return el
}

/**
 * Creates and returns created DOM element
 * @param {Object} [attributes={}] - key/value pair of attributes to create element with
 * @param {string} [attributes.id='root'] - id to set on the attribute
 * @param {string} [attributes.element='div'] - type of element to set
 * @param {...*} [attributes.rest] - other attributes to set on the element
 * @param {Object} [docObj=doc] - the DOM document object
 * @return {Object} DOM element that was created
 */
function createElement(
  { id = 'root', element = 'div', ...rest } = {},
  docObj = doc,
) {
  const el = docObj.createElement(element)
  const attributes = { ...rest, id }
  return setAttributes(el, attributes)
}

/**
 * Adds element sent in into the document (appended to body)
 * @param {Object} element - the DOM element to append to the document.body
 * @param {Object} [docObj=doc] - the document object for the page
 * @return {Object} the element appended to the body
 */
function addElement(element, docObj = doc) {
  // TODO: figure out how we can get { body: { appendChild } } = doc to work
  docObj.body.appendChild(element)
  return element
}

/**
 * Creates and adds the element passed in onto the body of the doc sent in
 * @param {Object} [attributes={}] - the attributes to use to create the element
 * @param {Object} [docObj=doc] - the document object to append the created element onto
 * @return {Object} the created and appended object
 */
function createAndAdd(attributes = {}, docObj = doc) {
  const el = createElement(attributes, docObj)
  return addElement(el, docObj)
}

/**
 * Creates a specific div with id of root and appends it to the document sent in
 * @param {Object} [attributes={}] - set of attributes (minus id) to set on the root element
 * @param {Object} [docObj=doc] - the document object to append the created element onto
 * @return {Object} the created and appended div
 */
function createRootDiv(attributes = {}, docObj = doc) {
  const attrs = { ...attributes, id: 'root', element: 'div' }
  return createAndAdd(attrs, docObj)
}

/**
 * Returns the position of the cursor for an element.
 * This is intended to be used within a contenteditable element
 * @param {Object} element - the DOM object to retrieve the caret position from
 * @return {number} index within the element on where it is
 */
function getCaretPosition(element) {
  const isIE = !!(typeof document.selection !== 'undefined' && document.selection.type !== 'Control')
  const other = !!(typeof window.getSelection !== 'undefined')
  if (other) {
    const range = window.getSelection().getRangeAt(0)
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(element)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    return preCaretRange.toString().length
  }
  if (isIE) {
    const textRange = document.selection.createRange
    const preCaretTextRange = document.body.createTextRange()
    preCaretTextRange.moveToElementText(element)
    preCaretTextRange.setEndPoint("EndToEnd", textRange)
    return preCaretTextRange.text.length
  }
  return 0
}

  /*
function setCaretPosition({ lineNumberelement) {
  const range = document.createRange()
  const selection = window.getSelection()
  range.setStart(element.childNodes[2], 5)
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}
*/

export {
  getCaretPosition,
  setAttributes,
  createElement,
  addElement,
  createAndAdd,
  createRootDiv,
}
