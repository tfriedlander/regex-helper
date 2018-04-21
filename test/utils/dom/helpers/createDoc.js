const sinon = require('sinon')

function createdEl() {
  const el = { }
  el.setAttribute = (key, val) => {
    el[key] = val
    return el
  }
  return el
}

function createDoc(el = createdEl()) {
  const appendChild= sinon.spy()
  const body = {
    appendChild,
  }
  const createElement = sinon.stub().returns(el)
  return { body, createElement }
}

module.exports = { createDoc, createdEl }
