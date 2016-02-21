import React, { PropTypes } from 'react'
import Avatar from './avatar'

const MAX_POINTS = 20

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    const players = this.props.game.players || {}
    const playersList = Object.keys(players).map(id => players[id])

    const points = []
    for (let i = 0; i < MAX_POINTS; i++) {
      points.push(
        <li key={i} className='score-number' data-number={i + 1}>
          { this.renderPlayersByScore(playersList, i + 1) }
        </li>
      )
    }

    return (
      <div className='score'>
        <p>
          Score
        </p>
        <div className='board'>
          <ul>
            <li className='score-number start'>
              { this.renderPlayersByScore(playersList, 0) }
            </li>
            { points }
            <li className='score-number end'>
              { this.renderPlayersByScore(playersList, MAX_POINTS + 1) }
            </li>
          </ul>
        </div>
      </div>
    )
  },

  renderPlayersByScore (playersList, targetScore) {
    return playersList
      .filter(player => targetScore === (player.score || 0))
      .map(player => <Avatar key={player.id} player={player} />)
  }
})
