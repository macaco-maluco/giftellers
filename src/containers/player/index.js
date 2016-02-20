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
            ? <PlayerGame playerId={this.state.playerId} game={this.state.game}/>
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
  }
})
