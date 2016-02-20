import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

export default React.createClass({
  propTypes: {
    player: PropTypes.object,
    onClickNextStep: PropTypes.func
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
          this.props.player.leader &&
            <RaisedButton
              style={{ float: 'right', marginTop: '14px' }}
              label={stepLabel(this.props.player.leader.step)}
              primary
              onClick={this.props.onClickNextStep}
            />
        }
      </div>
    )
  }
})

function stepLabel (step) {
  switch (step % 4) {
    case 0:
      return 'Start Round'

    case 1:
      return 'Show story'

    case 2:
      return 'Show cards'

    case 3:
      return 'Finish round'
  }
}