import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BOLD, ITALIC, UNDERLINE } from '../constants/buttons'

const mapBtnView = {
  [BOLD]: { sign: 'B', style: { fontWeight: 'bold' }, function: () => document.execCommand('bold') },
  [ITALIC]: { sign: 'I', style: { fontStyle: 'italic' }, function: () => document.execCommand('italic') },
  [UNDERLINE]: { sign: 'U', style: { textDecoration: 'underline' }, function: () => document.execCommand('underline') },
}

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
  }

  render () {
    const { type, isActive } = this.props
    const btnProps = mapBtnView[type]
    return (
      <button
        className="format-action"
        style={{ ...btnProps.style, background: isActive ? 'yellow' : 'white' }}
        onClick={btnProps.function}
      >
        {btnProps.sign}
      </button>
    )
  }
}
