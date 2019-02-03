import React, { Component } from 'react'
import './App.css'
import ControlPanel from '../components/ControlPanel'
import FileZone from '../components/FileZone'
import { getMockText, getSynonyms } from '../utils/text.service'
import Tooltip from '../components/Tooltip'

class App extends Component {
  state = {
    synonyms: {
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
    console.log('selected word: ', word)
    const synonyms = await getSynonyms(word)
    const synonymsList = synonyms.map(({ word }) => word)
    const positionProps = window.getSelection().getRangeAt(0).getBoundingClientRect()
    const range = window.getSelection().getRangeAt(0)
    this.setState({ synonyms: { word, synonymsList, positionProps, range } })
  }

  resetWord = () => {
    this.setState({ synonyms: this.defaultSynonymsState })
  }

  replaceWord = (e) => {
    const { range } = this.state.synonyms
    range.deleteContents()
    const newTxt = document.createTextNode(e.target.innerText)
    range.insertNode(newTxt)
    this.resetWord()
  }

  render () {
    const { modifiers, synonyms: { word, synonymsList, positionProps, range } } = this.state
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel {...modifiers}/>
          <FileZone
            getText={getMockText}
            setModifiers={this.getCursorState}
            chooseWord={this.getWordSynonyms}
          />
          {word && <Tooltip position={positionProps} replaceWord={this.replaceWord} wordsList={synonymsList}/>}
        </main>
      </div>
    )
  }
}

export default App
