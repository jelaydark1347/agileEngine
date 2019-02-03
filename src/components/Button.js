import React, { Component } from 'react'
import PropTypes from 'prop-types'
import modifiers from '../utils/modifiers'
import { BOLD, ITALIC, UNDERLINE } from '../constants/buttons'

const mapBtnView = {
  [BOLD]: { sign: 'B', style: { fontWeight: 'bold' } },
  [ITALIC]: { sign: 'I', style: { fontStyle: 'italic' } },
  [UNDERLINE]: { sign: 'U', style: { textDecoration: 'underline' } },
}

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
        className="format-action"
        style={{ ...btnProps.style, background: isActive ? 'yellow' : 'white' }}
        onClick={modifiers[type]}
        disabled={disabled}
      >
        {btnProps.sign}
      </button>
    )
  }
}
