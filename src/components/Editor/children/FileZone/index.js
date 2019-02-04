import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { modifySelection, cutDownSelection } from '../../../../utils/selection'
import './FileZone.css'

class FileZone extends Component {
  static propTypes = {
    defaultText: PropTypes.string,
    setModifiers: PropTypes.func,
    onSelect: PropTypes.func,
    resetSelected: PropTypes.func,
    closeModifiers: PropTypes.func,
    selectSolidWord: PropTypes.bool,
  }

  constructor () {
    super()
    this.textArea = React.createRef()
  }

  async componentDidMount () {
    const { defaultText } = this.props
    if (defaultText) {
      this.textArea.current.innerHTML = defaultText // set default text
    }
  }

  onSelect = async () => {
    const { selectSolidWord, setModifiers, resetSelected, onSelect } = this.props
    setModifiers()
    const selection = window.getSelection()
    if (selectSolidWord) {
      const selHasSpace = selection.toString().match(/\W/g)
      if (!selection.isCollapsed && !selHasSpace) {
        modifySelection(selection)
        const word = selection.toString()
        onSelect(word)
      }
      if (!selection.isCollapsed && selHasSpace) {
        cutDownSelection(selection)
      }
      if (selection.isCollapsed) {
        resetSelected()
      }
    } else {
      const word = selection.toString()
      onSelect(word)
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
