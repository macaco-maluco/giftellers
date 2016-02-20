import React from 'react'
import { PropTypes } from 'react'

import GameLogic from '../../game-logic'
import BigScreenGame from '../../components/big-screen-game'
import Loader from '../../components/loader'

export default React.createClass({
  propTypes: {
    firebase: PropTypes.object
  },

  getInitialState () {
    return {}
  },

  componentWillMount () {
    const gameLogic = new GameLogic(this.props.firebase)
    gameLogic
      .create()
      .then(() => gameLogic.onChange(game => this.setState(game)))
  },

  render () {
    return (
      <div className='big-screen'>
        {
          this.state.id
            ? <BigScreenGame game={this.state}/>
            : <Loader/>
        }
      </div>
    )
  }
})
