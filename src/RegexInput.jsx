import React from 'react'

class RegexInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', regex: null, flags: '' }

    this.handleRegExpChange = this.handleRegExpChange.bind(this)
    this.handleFlagChange = this.handleFlagChange.bind(this)
    this.setRegex = this.setRegex.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.flags !== this.state.flags ||
      nextState.regex !== this.state.regex ||
      nextState.text !== this.state.text
    )
  }

  setRegex(otherState) {
    const nextState = Object.assign({}, this.state, otherState, { regex: null })
    const { flags, text } = nextState
    try {
      const regex = flags ? RegExp(text, flags) : RegExp(text)
      nextState.regex = regex
      // if this is a valid regex then lets kick off our handler
      this.props.handleRegexInput(regex)
    } catch(error) {
      // not a valid regex
      // throwing this error away since this may be mid-input
      // TODO: add way to identify to user that it is invalid
    }
    this.setState(nextState)
  }

  handleFlagChange(event) {
    const { target: { value = '' } } = event
    const { flags } = this.state
    const nextState = { flags: value.replace(/[^gimuy]/g, '') }
    if (flags !== nextState.flags) {
      this.setRegex(nextState)
    }
  }

  handleRegExpChange(event) {
    const { target: { value = '' } } = event
    const { text } = this.state
    const nextState = { text: value }
    if (text !== nextState.text) {
      this.setRegex(nextState)
    }
  }

  render() {
    const { text = '', regex, flags } = this.state
    const strRegex = `${regex}`
    console.log('rendering RegexInput')
    return (
      <div>
        /<input type="text" onChange={ this.handleRegExpChange } value={ text } />/
        <input type="text" onChange={this.handleFlagChange} value={flags} />
        <p>Regex: {strRegex}</p>
      </div>
    )
  }
}

export default RegexInput
