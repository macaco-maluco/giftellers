import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    playerId: PropTypes.string,
    game: PropTypes.object
  },

  render () {
    return (
      <span>{this.props.game.status}</span>
    )
  }
})