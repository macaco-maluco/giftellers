import React from 'react'
import { PropTypes } from 'react'
import PlayerJoin from '../../components/player-join'

export default React.createClass({
  propTypes: {
    firebase: PropTypes.object
  },

  getInitialState () {
    return {
      gameId: null,
      game: {}
    }
  },

  render () {
    return (
      <div className='player-screen'>
        <PlayerJoin onJoin={this.handleJoin}/>
      </div>
    )
  },

  handleJoin (gameId) {
    console.log(gameId)
  }
})
