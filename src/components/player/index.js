import React from 'react'
import { PropTypes } from 'react'

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
      <div>
        <input ref='gameId'/>
        <button onClick={this.handleJoin}>Join</button>
        <h2>{this.state.game.counter}</h2>
      </div>
    )
  },

  handleJoin () {
    const firebase = this.props.firebase
    const gameId = this.refs.gameId.value

    firebase.child(`games/${gameId}`).on('value', snapshot => {
      this.setState({
        game: snapshot.val()
      })
    })
  }
})
