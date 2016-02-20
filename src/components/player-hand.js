import React from 'react'
import { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    hand: PropTypes.array
  },

  render () {
    return (
      <div>
        {this.renderCards()}
      </div>
    )
  },

  renderCards () {
    return this.props.hand.map((card, i) => {
      return <video key={i} src={card.mp4} autoPlay loop/>
    })
  }
})
