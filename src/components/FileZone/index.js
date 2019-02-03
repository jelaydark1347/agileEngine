import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { modifySelection, cutDownSelection } from '../../utils/selection'
import './FileZone.css'

class FileZone extends Component {
  static propTypes = {
    getText: PropTypes.func,
    setModifiers: PropTypes.func,
    chooseWord: PropTypes.func,
    resetSelected: PropTypes.func,
    closeModifiers: PropTypes.func,
  }

  constructor () {
    super()
    this.textArea = React.createRef()
  }

  async componentDidMount () {
    const { getText } = this.props
    if (getText) {
      this.textArea.current.innerHTML = await getText() // set default text
    }
  }

  onSelect = () => {
    this.props.setModifiers()
    const selection = window.getSelection()
    const selHasSpace = selection.toString().match(/\W/g)
    if (!selection.isCollapsed && !selHasSpace) {
      modifySelection(selection)
      const word = selection.toString()
      this.props.chooseWord(word)
    }
    if (!selection.isCollapsed && selHasSpace) {
      cutDownSelection(selection)
    }
    if (selection.isCollapsed) {
      this.props.resetSelected()
    }
  }

  onInput = (e) => {
    if (e.key === 'Enter' || e.key.match(/\W/)) {
      this.props.closeModifiers()
    }
  }

  render () {
    return (
      <div id="file-zone">
        <div
          id="file"
          ref={this.textArea}
          contentEditable={true}
          onSelect={this.onSelect}
          onKeyPress={this.onInput}
        />
      </div>
    )
  }
}

export default FileZone
