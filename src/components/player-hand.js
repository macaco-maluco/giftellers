import React from 'react'
import { PropTypes } from 'react'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardMedia from 'material-ui/lib/card/card-media'
import CardActions from 'material-ui/lib/card/card-actions'

import RaisedButton from 'material-ui/lib/raised-button'

const CARD_STYLE = {
  textAlign: 'center',
  padding: '20px',
  margin: '0 20px 20px 20px'
}

export default React.createClass({
  propTypes: {
    hand: PropTypes.array,
    selectedCard: PropTypes.string,
    onCardSelected: PropTypes.func,
    disabled: PropTypes.boolean
  },

  render () {
    return (
      <div className='player-hand'>
        {this.renderCards()}
      </div>
    )
  },

  handleClick (cardUrl) {
    this.props.onCardSelected(cardUrl)
  },

  renderCards () {
    return this.props.hand.map(card => {
      const overlay = this.props.selectedCard === card.url
        ? <CardTitle title='Selected' />
        : null

      return (
        <div key={card.url} className='hand-card'>
          <Card style={CARD_STYLE}>
            <CardMedia overlay={overlay}>
              <img src={card.url} />
            </CardMedia>
            {
              !this.props.disabled &&
              <CardActions style={{ padding: '8px 0 0 0' }}>
                <RaisedButton
                  label='Select'
                  secondary
                  onClick={this.handleClick.bind(null, card.url)}
                  style={{ width: '100%' }}
                />
              </CardActions>
            }
          </Card>
        </div>
      )
    })
  }
})
