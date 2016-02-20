import React, { PropTypes } from 'react'
import PlayerHead from './player-header'
import PlayerHand from './player-hand'

export default React.createClass({
  propTypes: {
    playerId: PropTypes.string,
    game: PropTypes.object
  },

  render () {
    const id = this.props.playerId
    const player = this.props.game.players[id]

    return (
      <div className='player-game'>
        {
          player
            ? this.renderGame(player)
            : this.renderLoader()
        }
      </div>
    )
  },

  renderLoader () {
    return <span />
  },

  renderGame (player) {
    return (
      <div>
        <PlayerHead player={player} />
        <PlayerHand hand={player.hand || []} />
      </div>
    )
  }
})
