import React, { PropTypes } from 'react'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'

import Lobby from './lobby'
import Score from './score'
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
          : <Score game={this.props.game}/>
      case 1:
        return this.renderStoryTeller(players)
      case 2:
        return <span>Make your choice</span>
      case 3:
        return this.renderSelectedCards(players)
    }
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
  },

  renderSelectedCards (players) {
    const cards = Object
      .keys(players)
      .map(id => players[id].selectedCard)
      .sort()

    return (
      <GridList className='selected-cards' cols={4} cellHeight={200}>
        {
          cards.map((cardUrl, i) => {
            return (
              <GridTile key={cardUrl}
                        title={<span className='title'>{`#${i}`}</span>}>
                <img src={cardUrl} />
              </GridTile>
            )
          })
        }
      </GridList>
    )
  }
})
