import React, { Component } from 'react'
import ControlPanel from '../components/ControlPanel'
import FileZone from '../components/FileZone'
import Tooltip from '../components/Tooltip'
import { getMockText, getSynonyms } from '../utils/text.service'
import { hasSelection } from '../utils/selection'
import './App.css'

class App extends Component {
  state = {
    synonymProps: {
      word: '',
      synonymsList: [],
      positionProps: {},
      range: {},
    },
    modifiers: {
      bold: false,
      underline: false,
      italic: false,
    },
  }

  defaultSynonymsState = {
    word: '',
    synonymsList: [],
    positionProps: {},
    range: {},
  }

  getCursorState = () => {
    const bold = document.queryCommandState('bold')
    const underline = document.queryCommandState('underline')
    const italic = document.queryCommandState('italic')
    this.setState({ modifiers: { bold, underline, italic } })
  }

  getWordSynonyms = async (word) => {
    const synonyms = await getSynonyms(word)
    const synonymsList = synonyms.map(({ word }) => word)
    const positionProps = window.getSelection().getRangeAt(0).getBoundingClientRect()
    const range = window.getSelection().getRangeAt(0)
    this.setState({ synonymProps: { word, synonymsList, positionProps, range } })
  }

  resetWord = () => {
    const { synonymProps: { word } } = this.state
    if (word) {
      this.setState({ synonymProps: this.defaultSynonymsState })
    }
  }

  closeModifiers = () => {
    const { modifiers } = this.state
    Object.keys(modifiers).forEach((key) => {
      if (modifiers[key]) { // if modifier turned on
        document.execCommand(key) // turn off
      }
    })
  }

  replaceWord = (e) => {
    const { range } = this.state.synonymProps
    const { endContainer, startContainer } = range
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

  render () {
    const { modifiers, synonymProps: { word, synonymsList, positionProps } } = this.state
    const isBtnsDisabled = hasSelection()
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel {...modifiers} disabled={isBtnsDisabled}/>
          <FileZone
            getText={getMockText}
            setModifiers={this.getCursorState}
            chooseWord={this.getWordSynonyms}
            resetSelected={this.resetWord}
            closeModifiers={this.closeModifiers}
          />
          {word && <Tooltip position={positionProps} replaceWord={this.replaceWord} wordsList={synonymsList}/>}
        </main>
      </div>
    )
  }
}

export default App
