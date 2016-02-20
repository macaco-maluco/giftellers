import React from 'react'
import { PropTypes } from 'react'
import ReactSwipe from 'react-swipe'

import Card from 'material-ui/lib/card/card'
import CardMedia from 'material-ui/lib/card/card-media'
import ArrowLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import ArrowRight from 'material-ui/lib/svg-icons/navigation/chevron-right'

const CARD_STYLE = {
  textAlign: 'center',
  padding: '10px',
  margin: '10px'
}

const ARROW_STYLE = {
  fill: 'white',
  width: '15vh',
  height: '15vh'
}

export default React.createClass({
  propTypes: {
    hand: PropTypes.array
  },

  render () {
    return (
      <div className='player-hand'>
        <ReactSwipe ref='reactSwipe' key={this.props.hand.length} continuous>
          {this.renderCards()}
        </ReactSwipe>
        <button className='arrow-left' onClick={this.prev}>
          <ArrowLeft style={ARROW_STYLE}/>
        </button>
        <button className='arrow-right' onClick={this.next}>
          <ArrowRight style={ARROW_STYLE}/>
        </button>
      </div>
    )
  },

  renderCards () {
    return this.props.hand.map(card => {
      return (
        <div key={card.url} className='hand-card'>
          <Card style={CARD_STYLE}>
            <CardMedia>
              <img src={card.url} autoPlay loop/>
            </CardMedia>
          </Card>
        </div>
      )
    })
  },

  next: function () {
    this.refs.reactSwipe.swipe.next()
  },

  prev: function () {
    this.refs.reactSwipe.swipe.prev()
  }
})
