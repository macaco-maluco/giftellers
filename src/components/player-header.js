import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

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
        {
          this.props.player.isLeader &&
            <RaisedButton
              style={{ float: 'right', marginTop: '14px' }}
              label='Start round'
              primary
            />
        }
      </div>
    )
  }
})
