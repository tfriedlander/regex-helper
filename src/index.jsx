import React from 'react'
import ReactDOM from 'react-dom'
import { createRootDiv } from './utils/dom'
import App from './App'

const root = createRootDiv()

ReactDOM.render(
  <App />,
  root
)
