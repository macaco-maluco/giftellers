import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import PlayerHead from './player-header'
import PlayerHand from './player-hand'
import PlayerVote from './player-vote'
import Loader from './loader'

const CARD_STYLE = {
  margin: '20px'
}

export default React.createClass({
  propTypes: {
    playerId: PropTypes.string,
    game: PropTypes.object,
    onClickNextStep: PropTypes.func,
    onCardSelected: PropTypes.func,
    onCardVoted: PropTypes.func
  },

  render () {
    const id = this.props.playerId
    const game = this.props.game
    const voteCards = game.shuffledVotingCards
    const player = game.players[id]

    const leaderId = this.props.game.leaderId
    const players = this.props.game.players || {}
    const leaderPlayer = players[leaderId] || {}

    const step = (leaderPlayer.leader || { step: 0 }).step

    return (
      <div className='player-game'>
        {
          player
            ? this.renderGame(player, step, voteCards)
            : this.renderLoader()
        }
      </div>
    )
  },

  renderLoader () {
    return <Loader />
  },

  renderGame (player, step, voteCards) {
    const roundStep = step % 5
    const storyTellerSelectingCard = roundStep === 1
    const playersChoosingCards = roundStep === 2
    const playersVoting = roundStep === 3
    const isHandVisible = (player.isStoryTeller && !playersChoosingCards && !playersVoting) ||
                          (!player.isStoryTeller && !playersVoting)

    const isSelectionEnabled = playersChoosingCards || player.isStoryTeller && storyTellerSelectingCard

    return (
      <div>
        <PlayerHead
          player={player}
          onClickNextStep={this.props.onClickNextStep}
        />
        {
          isHandVisible &&
          <PlayerHand
            hand={player.hand || []}
            selectedCard={player.selectedCard}
            disabled={!isSelectionEnabled}
            onCardSelected={this.props.onCardSelected}
          />
        }
        {
          !player.isStoryTeller &&
            playersVoting &&
            voteCards &&
            voteCards.length > 0 &&
            <PlayerVote cards={voteCards}
                        votedCardIndex={player.votedCardIndex}
                        onCardVoted={this.props.onCardVoted}/>
        }
        {
          player.isStoryTeller && playersChoosingCards &&
            <Card style={CARD_STYLE}>
              <CardText>
                Wait for players to choose their cards
              </CardText>
            </Card>
        }
        {
          player.isStoryTeller && playersVoting &&
            <Card style={CARD_STYLE}>
              <CardText>
                Wait for players to cast their votes
              </CardText>
            </Card>
        }
      </div>
    )
  }
})
