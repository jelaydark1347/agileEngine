import React from 'react'
import PropTypes from 'prop-types'
import modifiers from '../../../../../utils/modifiers'

const Button = ({ type, isActive, disabled, sign, btnStyle = {}, method }) =>
  <button
    className={`format-action`}
    style={{ ...btnStyle, background: isActive ? 'yellow' : 'white' }}
    onClick={method || modifiers[type]}
    disabled={disabled}
  >
    {sign}
  </button>

export default Button

Button.propTypes = {
  type: PropTypes.string,
  sign: PropTypes.string,
  btnStyle: PropTypes.object,
  method: PropTypes.func,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
}
