import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { BOLD, ITALIC, UNDERLINE } from '../../constants/buttons'
import './ControlPanel.css'

class ControlPanel extends Component {
  static propTypes = {
    bold: PropTypes.bool.isRequired,
    italic: PropTypes.bool.isRequired,
    underline: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
  }

  render () {
    const { bold, italic, underline, disabled } = this.props
    return (
      <div id="control-panel">
        <div id="format-actions">
          <Button type={BOLD} isActive={bold} disabled={disabled}/>
          <Button type={ITALIC} isActive={italic} disabled={disabled}/>
          <Button type={UNDERLINE} isActive={underline} disabled={disabled}/>
        </div>
      </div>
    )
  }
}

export default ControlPanel
