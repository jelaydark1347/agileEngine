import React, { Component } from 'react'
import Button from '../Button'
import { BOLD, ITALIC, UNDERLINE } from '../../constants/buttons'
import './ControlPanel.css'

class ControlPanel extends Component {
  render () {
    return (
      <div id="control-panel">
        <div id="format-actions">
          <Button type={BOLD}/>
          <Button type={ITALIC}/>
          <Button type={UNDERLINE}/>
        </div>
      </div>
    )
  }
}

export default ControlPanel
