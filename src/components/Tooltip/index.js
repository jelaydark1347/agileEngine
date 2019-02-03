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
    const coordinates = { top, left: `${left - 100 + (width / 2)}px` }
    return (
      <Fragment>
        {wordsList.length
          ? <ul className={'synonym-list'} style={coordinates}>
            {wordsList.map(buildList(replaceWord))}
          </ul>
          : <div
            className={'synonym-list'}
            style={{ ...coordinates, top: '20px' }}
          >
            U found word without synonyms :)
          </div>
        }
      </Fragment>
    )
  }
}
