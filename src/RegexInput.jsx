import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

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
    const strRegex = `${regex || 'N/A'}`
    const styles = {
      width: '80%',
      float: 'left',
      display: 'flex',
    }
    return (
      <div style={styles}>
        <div style={{ padding: 20 }}>
          <TextField type="text" placeholder="Regular Expression" onChange={ this.handleRegExpChange } value={ text } />
          <br />
          <TextField type="text" placeholder="Regex Flags" onChange={this.handleFlagChange} value={flags} />
          <br />
        </div>
        <div style={{ padding: 20 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Regex used</Typography>
              <Typography variant="h5" component="h2">{strRegex}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

export default RegexInput
