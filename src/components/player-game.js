import React, { PropTypes } from 'react'
import PlayerHand from './player-hand'

export default React.createClass({
  propTypes: {
    playerId: PropTypes.string,
    game: PropTypes.object
  },

  render () {
    return (
      <div>
        <span>{this.props.game.status}</span>
        <PlayerHand hand={this.props.game.players[this.props.playerId].hand || []}/>
      </div>
    )
  }
})
