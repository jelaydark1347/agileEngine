import React, { Component } from 'react'
import PropTypes from 'prop-types'
import modifiers from '../utils/modifiers'
import { mapBtnView } from '../constants/buttons'

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  render () {
    const { type, isActive, disabled } = this.props
    const btnProps = mapBtnView[type]
    return (
      <button
        className={`format-action`}
        style={{ ...btnProps.style, background: isActive ? 'yellow' : 'white' }}
        onClick={modifiers[type]}
        disabled={disabled}
      >
        {btnProps.sign}
      </button>
    )
  }
}
