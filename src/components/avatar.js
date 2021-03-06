import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    player: PropTypes.object,
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
  },

  render () {
    return (
      <span className='avatar'
            style={{backgroundColor: this.props.player.color}}>
        &nbsp;
        {this.props.children}
      </span>
    )
  }
})
