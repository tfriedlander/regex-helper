import React from 'react'
import { getMatches } from './utils/matches'
import RegexInput from './RegexInput'
import TextInput from './TextInput'
import MatchOutput from './MatchOutput'
import Typography from '@material-ui/core/Typography'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = { text: '', regex: null, matches: [] }

    // recommended react way of binding class methods
    this.handleRegexInput = this.handleRegexInput.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
    this.generateMatches = this.generateMatches.bind(this)
  }

  /**
   * Will try to run the regexp against the text input
   * and store successful matches into state.matches
   */
  generateMatches(nextState) {
    const text = typeof nextState.text !== 'undefined' ? nextState.text : this.state.text
    const regex = typeof nextState.regex !== 'undefined' ? nextState.regex : this.state.regex
    const matches = (text && regex) ? getMatches(text, regex) : []
    this.setState({ text, regex, matches })
  }

  /**
   * When the regex changes we want to update
   * the regex in state and remove the previous matches
   * @param {RegExp|null} regex - regex object to match with,
   *   or null when an invalid regex is present
   */
  handleRegexInput(regex) {
    this.generateMatches({ regex })
  }

  /**
   * When the text input changes we want to update
   * the text in state and remove the previous matches
   * @param {string} text - text input to match on
   */
  handleTextInput(text) {
    this.generateMatches({ text })
  }

  render() {
    const { matches } = this.state
    return (
      <div>
        <Typography variant="h2" gutterBottom>REGEX Helper</Typography>
        <div> {/* make this a flex box that stays up top for desktop and mobile */}
          <RegexInput handleRegexInput={this.handleRegexInput} />
        </div>
        <div> {/* make this a flex box that stays to the right for desktop, and goes under top for mobile*/}
          <MatchOutput matches={matches} />
        </div>
        <div> {/* make this a flex box that is on the bottom when mobile*/}
          <TextInput handleTextInput={this.handleTextInput} matches={matches} />
        </div>
      </div>
    )
  }

}

export default App
