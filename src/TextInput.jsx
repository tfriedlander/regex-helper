import React from 'react'

class TextInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { target: { value } } = event
    const { handleTextInput = () => true } = this.props
    handleTextInput(value)
    this.setState({ text: value })
  }

  render() {
    console.log('rendering TextInput')
    const { text } = this.state
    return (
      <div>
        <input type="text" onChange={ this.handleChange } value={ text } />
      </div>
    )
  }
}

export default TextInput
