import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    player: PropTypes.object
  },

  render () {
    return (
      <div className='player-header'>
        <span className='color'
              style={{backgroundColor: this.props.player.color}}>
          {this.props.player.id.substr(0, 3)}
        </span>
        <span className='label'>
          My color
        </span>
      </div>
    )
  }
})
