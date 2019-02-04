import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hasSelection } from '../../../../utils/selection'
import Button from './children/Button'
import './ControlPanel.css'

class ControlPanel extends Component {
  static propTypes = {
    modOnlySelection: PropTypes.bool,
    modifiersState: PropTypes.object,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      sign: PropTypes.string,
      btnStyle: PropTypes.object,
      method: PropTypes.func,
    })),
  }

  render () {
    const { buttons, modOnlySelection, modifiersState } = this.props
    const isDisabled = modOnlySelection && hasSelection()

    return (
      <div id="control-panel">
        <div id="format-actions">
          {!!buttons.length && buttons.map(({ type, sign, btnStyle, method }, index) =>
            <Button
              key={index}
              type={type}
              sign={sign}
              btnStyle={btnStyle}
              method={method}
              isActive={modifiersState[type]}
              disabled={isDisabled}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ControlPanel
