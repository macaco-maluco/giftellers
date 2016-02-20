import React from 'react'
import { PropTypes } from 'react'
import uuid from 'uuid'
import Hashids from 'hashids'

import Loader from '../../components/loader'

export default React.createClass({
  propTypes: {
    firebase: PropTypes.object
  },

  getInitialState () {
    return {
      game: {}
    }
  },

  componentWillMount () {
    this.props.firebase
      .child('gamesSequence')
      .transaction(this.updateSequence, this.updateSequenceCompleted)
  },

  render () {
    return (
      <div className='big-screen'>
        {
          this.state.game.id
            ? <span className='game-id'>{this.state.game.id}</span>
            : <Loader/>
        }
      </div>
    )
  },

  updateSequence (currentValue) {
    return (currentValue || 0) + 1
  },

  updateSequenceCompleted (err, committed, snapshot) {
    const firebase = this.props.firebase
    const hashids = new Hashids(uuid())

    if (committed) {
      const gameId = hashids.encode(snapshot.val())
      firebase
        .child('games')
        .child(gameId)
        .set({
          id: gameId,
          status: 'waiting'
        })

      firebase
        .child(`games/${gameId}`)
        .on('value', snapshot => this.gameLoop(snapshot))
    } else {
      console.error(err)
    }
  },

  gameLoop (snapshot) {
    this.setState({
      game: snapshot.val()
    })
  }
})
