import React, { PropTypes } from 'react'

import Lobby from './lobby'

export default React.createClass({
  propTypes: {
    game: PropTypes.object
  },

  render () {
    switch (this.props.game.status) {
      case 'waiting':
        return <Lobby game={this.props.game}/>
    }
  }
})
