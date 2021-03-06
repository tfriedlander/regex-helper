import React from 'react'
import Typography from '@material-ui/core/Typography'
import { colorizeText as colorizeMatchedText } from './utils/colorize'


class TextInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      html: '<span style="color: #000">Add Text Here</span>',
      update: false,
      timeout: null,
    }

    this.myRef = React.createRef()

    this.handleChange = this.handleChange.bind(this)
    this.colorizeText = this.colorizeText.bind(this)
    this.delayedUpdateState = this.delayedUpdateState.bind(this)
  }

  delayedUpdateState(state = this.state) {
    if (state.timeout) {
      clearTimeout(state.timeout)
    }
    return { timeout: setTimeout(this.colorizeText, 1000) }
  }

  colorizeText() {
    const { matches = [] } = this.props
    const { text = '', html: existingHtml } = this.state
    const html = colorizeMatchedText(text, matches)
    if (html != existingHtml) {
      this.setState({ html, update: true })
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    const { matches: nextMatches } = nextProps
    const { matches: prevMatches } = this.props
    if (JSON.stringify(nextMatches) !== JSON.stringify(prevMatches)) {
      this.setState(this.delayedUpdateState(nextState))
    }
    return nextState.update
  }

  handleChange(event) {
    const { target: { innerText: text, innerHtml: html = `<p>${text}</p>` } } = event
    const { handleTextInput = () => true } = this.props
    handleTextInput(text)
    this.setState({ text, html, update: false, ...this.delayedUpdateState(this.state) })
  }

  render() {
    const { text, html, } = this.state
    const { matches } = this.props
    const innerHTML = { __html: html.replace(/[\n\r]/g, '<br />') }
    const styles = {
      width: '80%',
      float: 'left',
      display: 'inline-block',
    }
    return (
      <div style={styles}>
        <Typography variant="h5">Set Input Below</Typography>
        <Typography variant="body1">
          <div
            ref={this.myRef}
            contentEditable="true"
            onInput={ this.handleChange }
            suppressContentEditableWarning="true"
            dangerouslySetInnerHTML={innerHTML}
          >
          </div>
        </Typography>
      </div>
    )
  }
}

export default TextInput
