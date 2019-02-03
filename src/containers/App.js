import React, { Component } from 'react'
import './App.css'
import ControlPanel from '../components/ControlPanel'
import FileZone from '../components/FileZone'
import { getMockText } from '../utils/text.service'

class App extends Component {
  render () {
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel/>
          <FileZone getText={getMockText}/>
        </main>
      </div>
    )
  }
}

export default App
