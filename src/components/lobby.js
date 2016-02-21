import React, { PropTypes } from 'react'
import Avatar from './avatar'

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
    const players = this.props.game.players || {}
    const playersJoined = Object
      .keys(players)
      .map(id => <Avatar key={id} player={players[id]} />)

    const waiting = 'waiting for players...'

    return (
      <p className='status'>
        {playersJoined.length > 0 ? playersJoined : waiting}
      </p>
    )
  }
})
