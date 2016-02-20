import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    return (
      <span>{this.props.game.status}</span>
    )
  }
})
