import React, { PropTypes } from 'react'
import GridList from 'material-ui/lib/grid-list/grid-list'

import Lobby from './lobby'
import Score from './score'
import Avatar from './avatar'
import VoteCard from './vote-card'

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    const leaderId = this.props.game.leaderId
    const players = this.props.game.players || {}
    const leaderPlayer = players[leaderId] || {}
    const cards = this.props.game.shuffledVotingCards

    const step = (leaderPlayer.leader || {step: 0}).step
    const waitingForPlayers = (step === 0)

    switch (step % 5) {
      case 0:
        return waitingForPlayers
          ? <Lobby game={this.props.game}/>
          : <Score game={this.props.game}/>
      case 1:
        return this.renderStoryTeller(players)
      case 2:
        return this.renderCardSelection(players)
      case 3:
        return this.renderSelectedCards(players, cards)
      case 4:
        return this.renderStorytellerCard(players)
    }
  },

  renderStoryTeller (players) {
    const storyTellerId = Object
      .keys(players)
      .find(playerId => players[playerId].isStoryTeller)

    const storyTeller = players[storyTellerId]

    return (
      <div className='story-teller'>
        <h1>Storyteller</h1>
        {
          storyTeller &&
            <Avatar player={storyTeller} />
        }
        <div className='guidance'>
          <p>
            Storyteller, choose a cards from your "hand" and put together a sentence or phrase that might describe it
          </p>
          <p>
            please say it out loud
          </p>
          <p>
            (without showing the card to the other players)
          </p>
        </div>
      </div>
    )
  },

  renderCardSelection (players) {
    const guessers = getPlayersGuessing(players)

    return (
      <div className='card-selection'>
        <h1>Players</h1>
        {
          guessers.map(guesser => <Avatar key={guesser.id} player={guesser} />)
        }
        <div className='guidance'>
          <p>
            Select from among your own cards the one that best matches the sentence given by the storyteller
          </p>
          <p>
            (without showing the card to the other players)
          </p>
        </div>
      </div>
    )
  },

  renderSelectedCards (players, cards = []) {
    return (
      <div className='card-voting'>
        <div className='guidance'>
          <p>
            guess which picture was the storyteller's
          </p>
        </div>
        <GridList className='selected-cards' cols={4} cellHeight={200}>
          {
            cards
              .map((cardUrl, i) => <VoteCard key={cardUrl} url={cardUrl} index={i} />)
          }
        </GridList>
      </div>
    )
  },

  renderStorytellerCard (players) {
    const storyTellerId = Object
      .keys(players)
      .find(playerId => players[playerId].isStoryTeller)

    const storyTeller = players[storyTellerId]

    return (
      <div className='storyteller-card'>
        <div className='guidance'>
          <p>
            Storyteller's card
          </p>
        </div>
        <img src={storyTeller.selectedCard} className='choice' />
      </div>
    )
  }
})

function getPlayersGuessing (players) {
  return Object
    .keys(players)
    .map(id => players[id])
    .filter(player => !player.isStoryTeller)
}
