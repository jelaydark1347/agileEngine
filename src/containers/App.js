import React, { Component } from 'react'
import { getMockText, getSynonyms } from '../utils/text.service'
import './App.css'
import Editor from '../components/Editor'
import { BOLD, ITALIC, UNDERLINE } from '../constants/buttons'

const defaultModifiers = [
  {
    type: BOLD,
    sign: 'B',
    btnStyle: { fontWeight: 'bold' },
    method: () => document.execCommand('bold'),
  },
  {
    type: ITALIC,
    sign: 'I',
    btnStyle: { fontStyle: 'italic' },
    method: () => document.execCommand('italic'),
  },
  {
    type: UNDERLINE,
    sign: 'U',
    btnStyle: { textDecoration: 'underline' },
    method: () => document.execCommand('underline'),
  },
]

class App extends Component {
  state = {
    text: '',
  }

  componentDidMount () {
    this.getDefaultText()
  }

  getDefaultText = async () => {
    const text = await getMockText()
    this.setState({ text })
  }

  render () {
    const { text } = this.state
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          {text && <Editor
            defaultText={text}
            getSynonyms={getSynonyms}
            modifiers={defaultModifiers}
            modOnlySelection={true}
            selectSolidWord={true}
            showSynonyms={true}
          />}
        </main>
      </div>
    )
  }
}

export default App
