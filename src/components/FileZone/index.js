import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './FileZone.css'

class FileZone extends Component {
  static propTypes = {
    getText: PropTypes.func,
  }

  constructor () {
    super()
    this.textArea = React.createRef()
  }

  async componentDidMount () {
    const { getText } = this.props
    if (getText) {
      this.textArea.current.innerHTML = await getText()
    }
  }

  render () {
    return (
      <div id="file-zone">
        <div
          id="file"
          ref={this.textArea}
          contentEditable={true}
        />
      </div>
    )
  }
}

export default FileZone
