import React from 'react'
import { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    firebase: PropTypes.object
  },

  componentWillMount () {
    const firebase = this.props.firebase
    const gameId = 1

    firebase.set({
      games: {
        [gameId]: {
          counter: 0
        }
      }
    })

    firebase.child(`games/${gameId}`).on('value', snapshot => {
      this.setState({
        game: snapshot.val()
      })
    })
  },

  render () {
    return (
      <div>
        <h1>Big screen</h1>
        <h2>{this.state.game.counter}</h2>
      </div>
    )
  }
})
