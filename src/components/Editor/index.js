import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash/function'
import ControlPanel from './children/ControlPanel'
import FileZone from './children/FileZone'
import Tooltip from './children/Tooltip'

export default class Editor extends Component {
  static propTypes = {
    selectSolidWord: PropTypes.bool,
    onSelect: PropTypes.func,
    showSynonyms: PropTypes.bool,
    modifiers: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      sign: PropTypes.string.isRequired,
      btnStyle: PropTypes.object,
      method: PropTypes.func.isRequired,
    })),
    defaultText: PropTypes.string,
    checkModState: PropTypes.func,
    getSynonyms: PropTypes.func,
    modOnlySelection: PropTypes.bool,
  }

  static defaultProps = {
    selectSolidWord: true,
    showSynonyms: false,
    modifiers: [],
    checkModState: (type) => document.queryCommandState(type),
    modOnlySelection: true,
  }

  constructor (props) {
    super(props)
    this.synonymsState = props.showSynonyms
      ? {
        word: '',
        synonymsList: [],
        positionProps: {},
        range: {},
      }
      : {}
    const modifiersState = props.modifiers.reduce((acc, { type }) => ({ ...acc, [type]: false }), {})
    this.modifiersMethods = props.modifiers.reduce((acc, { type, method }) => ({ ...acc, [type]: method }), {})
    this.state = {
      synonymsState: this.synonymsState,
      modifiersState,
    }
  }

  getCursorState = debounce(() => {
    const { checkModState } = this.props
    const { modifiersState } = this.state
    if (checkModState) {
      const newMState = Object.keys(modifiersState).reduce((acc, type) => ({ ...acc, [type]: checkModState(type) }), {})
      this.setState({ modifiersState: newMState })
    }
  }, 50)

  onSelect = async (word) => {
    const { showSynonyms, getSynonyms, onSelect } = this.props
    if (showSynonyms && getSynonyms) {
      const synonymsList = await getSynonyms(word)
      const positionProps = window.getSelection().getRangeAt(0).getBoundingClientRect()
      const range = window.getSelection().getRangeAt(0)
      this.setState({ synonymsState: { word, synonymsList, positionProps, range } })
    } else if (onSelect) {
      onSelect(word)
    }
  }

  resetWord = () => {
    const { showSynonyms } = this.props
    if (showSynonyms) {
      const { synonymsState: { word } } = this.state
      if (word) {
        this.setState({ synonymsState: this.synonymsState })
      }
    }
  }

  closeModifiers = () => {
    const { modifiersState } = this.state
    Object.keys(modifiersState).forEach((type) => {
      if (modifiersState[type]) { // if modifier turned on
        this.modifiersMethods[type]() // turn off
      }
    })
  }

  replaceWord = (e) => {
    const { range } = this.state.synonymsState
    const { endContainer, startContainer } = range || {}
    if (endContainer && startContainer) {
      if (endContainer !== startContainer) { // to save modifiers if selected via dblClick
        range.setEnd(startContainer, startContainer.length) // set end of the selection back to modifying tags
      }
      range.deleteContents()
      const newTxt = document.createTextNode(e.target.innerText)
      range.insertNode(newTxt)
      range.collapse(false) // put curson at the and of the word
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range) // return curson to workArea
      this.resetWord()
    }
  }

  render () {
    const { modifiers, modOnlySelection, defaultText, selectSolidWord } = this.props
    const { synonymsState: { word, positionProps, synonymsList }, modifiersState } = this.state
    return (
      <Fragment>
        <ControlPanel buttons={modifiers} modOnlySelection={modOnlySelection} modifiersState={modifiersState}/>
        <FileZone
          defaultText={defaultText}
          setModifiers={this.getCursorState}
          onSelect={this.onSelect}
          resetSelected={this.resetWord}
          closeModifiers={this.closeModifiers}
          selectSolidWord={selectSolidWord}
        />
        {word && <Tooltip position={positionProps} replaceWord={this.replaceWord} wordsList={synonymsList}/>}
      </Fragment>
    )
  }
}
