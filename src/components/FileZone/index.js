import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './FileZone.css'

class FileZone extends Component {
  static propTypes = {
    getText: PropTypes.func,
    setModifiers: PropTypes.func,
    chooseWord: PropTypes.func,
    resetSelected: PropTypes.func,
  }

  constructor () {
    super()
    this.textArea = React.createRef()
  }

  async componentDidMount () {
    const { getText } = this.props
    if (getText) {
      this.textArea.current.innerHTML = await getText()
    }
  }

  onSelect = () => {
    this.props.setModifiers()
    const selection = window.getSelection()
    const selHasSpace = selection.toString().match(/\W/g)
    // @TODO: make deselect when going back by selected text
    // if (!selection.isCollapsed && !selection.toString().match(/\s/) && this.isSelected) {
    //   console.log('owh')
    // }
    if (!selection.isCollapsed && !selHasSpace) {
      const { anchorOffset, focusOffset } = selection
      const selectionFromRight = (anchorOffset - focusOffset) > 0
      selection.modify('move', selectionFromRight ? 'right' : 'left', 'word')
      selection.modify('extend', selectionFromRight ? 'left' : 'right', 'word')
      const textTrash = selection.toString().match(/\W/g)
      if (textTrash) {
        const count = textTrash.length
        const { anchorOffset, anchorNode, focusOffset, focusNode } = selection
        if (selectionFromRight) {
          const newOffset = anchorOffset > count ? anchorOffset - count : focusNode.length
          const newNode = anchorOffset > count ? anchorNode : focusNode
          selection.setBaseAndExtent(newNode, newOffset, focusNode, focusOffset)
          const word = window.getSelection().toString()
          this.props.chooseWord(word)
        } else {
          selection.extend(focusNode, focusOffset - 1)
        }
      }
      const word = window.getSelection().toString()
      this.props.chooseWord(word)
    }
    if (!selection.isCollapsed && selHasSpace) {
      const node = selection.focusNode
      const offset = selection.focusOffset
      selection.setPosition(node, offset)
    }
    if (selection.isCollapsed) {
      this.props.resetSelected()
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
          onDoubleClick={() => false}
        />
      </div>
    )
  }
}

export default FileZone
