import React, { PropTypes } from 'react'

import Lobby from './lobby'
import Avatar from './avatar'

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    const leaderId = this.props.game.leaderId
    const players = this.props.game.players || {}
    const leaderPlayer = players[leaderId] || {}

    const step = (leaderPlayer.leader || {step: 0}).step
    const waitingForPlayers = (step === 0)

    switch (step % 4) {
      case 0:
        return waitingForPlayers
          ? <Lobby game={this.props.game}/>
          : this.renderScore()
      case 1:
        return this.renderStoryTeller(players)
      case 2:
        return <span>Make your choice</span>
      case 3:
        return <span>Votes</span>
    }
  },

  renderScore () {
    return <span>score</span>
  },

  renderStoryTeller (players) {
    const storyTellerId = Object
      .keys(players)
      .find(playerId => players[playerId].isStoryTeller)

    const storyTeller = players[storyTellerId]

    return (
      <div className='story-teller'>
        <h1>Waiting for:</h1>
        {
          storyTeller &&
            <Avatar player={storyTeller} />
        }
      </div>
    )
  }
})
