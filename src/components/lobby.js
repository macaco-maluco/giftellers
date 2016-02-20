import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    return (
      <div className='lobby'>
        <span className='game-id'>{this.props.game.id}</span>
        { this.renderPlayers() }
      </div>
    )
  },

  renderPlayers () {
    const count = Object.keys(this.props.game.players || {}).length
    const playersJoined = `${count} player${count > 1 ? 's' : ''} joined`
    const waiting = 'waiting for players...'

    return (
      <p className='status'>{count > 0 ? playersJoined : waiting}</p>
    )
  }
})
