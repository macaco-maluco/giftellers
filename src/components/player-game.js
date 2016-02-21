import React, { PropTypes } from 'react'

import PlayerHead from './player-header'
import PlayerHand from './player-hand'
import Loader from './loader'

export default React.createClass({
  propTypes: {
    playerId: PropTypes.string,
    game: PropTypes.object,
    onClickNextStep: PropTypes.func,
    onCardSelected: PropTypes.func
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
    return <Loader />
  },

  renderGame (player) {
    return (
      <div>
        <PlayerHead
          player={player}
          onClickNextStep={this.props.onClickNextStep}
        />
        <PlayerHand
          hand={player.hand || []}
          selectedCard={player.selectedCard}
          onCardSelected={this.props.onCardSelected}
        />
      </div>
    )
  }
})
