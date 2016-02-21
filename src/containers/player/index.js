import React from 'react'
import { PropTypes } from 'react'
import uuid from 'uuid'

import PlayerGame from '../../components/player-game'
import PlayerJoin from '../../components/player-join'

export default React.createClass({
  propTypes: {
    firebase: PropTypes.object
  },

  getInitialState () {
    return {
      game: {}
    }
  },

  render () {
    return (
      <div className='player-screen'>
        {
          this.state.game.id
            ? <PlayerGame
                playerId={this.state.playerId}
                game={this.state.game}
                onClickNextStep={this.handleClickNextStep}
                onCardSelected={this.handleCardSelected}
              />
            : <PlayerJoin onJoin={this.handleJoin}/>
        }
      </div>
    )
  },

  handleJoin (gameId) {
    const playerId = uuid()
    const firebase = this.props.firebase

    firebase
      .child(`games/${gameId}/players/${playerId}`)
      .set({
        id: playerId
      })

    firebase
      .child(`games/${gameId}`)
      .on('value', snapshot => this.setState({
        playerId: playerId,
        game: snapshot.val()
      }))
  },

  handleClickNextStep () {
    this.props.firebase
      .child(`games/${this.state.game.id}/players/${this.state.playerId}/leader/step`)
      .transaction(
        (currentValue) => {
          return (currentValue || 0) + 1
        },
        (err, committed, snapshot) => {
          if (err) {
            console.error('Error going to next step', err)
          }
        }
      )
  },

  handleCardSelected (cardUrl) {
    this.props.firebase
      .child(`games/${this.state.game.id}/players/${this.state.playerId}/selectedCard`)
      .set(cardUrl)
  }
})
