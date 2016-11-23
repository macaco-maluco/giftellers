import React, { PropTypes } from 'react'
import Avatar from './avatar'

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    return (
      <div className='lobby'>
        <div className='guidance'>
          <p>
            You will need 3 or more players. Get ready on a couch, fire up your smartphone and access:
          </p>
          <p>
            <a href='http://giftellers.macacomaluco.space/player.html'>
              http://giftellers.macacomaluco.space/player.html
            </a>
          </p>
        </div>
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
