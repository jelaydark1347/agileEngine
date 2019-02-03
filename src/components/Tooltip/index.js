import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './Tooltip.css'

const buildList = (onClick) => (word, index) =>
  <li className={'synonym-item'} title={word} key={index} onClick={onClick}>{word}</li>

export default class Tooltip extends Component {
  static propTypes = {
    position: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      width: PropTypes.number,
    }),
    wordsList: PropTypes.array,
    replaceWord: PropTypes.func,
  }

  render () {
    const { position: { top, left, width }, wordsList, replaceWord } = this.props
    return (
      <Fragment>
        {wordsList.length
          ? <ul className={'synonym-list'} style={{ top, left: `${left - 100 + (width / 2)}px` }}>
            {wordsList.map(buildList(replaceWord))}
          </ul>
          : <div className={'synonym-list'}>U found word without synonyms :)</div>
        }
      </Fragment>
    )
  }
}
