import React, { PropTypes } from 'react'
import GridList from 'material-ui/lib/grid-list/grid-list'
import VoteCard from './vote-card'

export default React.createClass({
  propTypes: {
    cards: PropTypes.array,
    votedCardIndex: PropTypes.number,
    onCardVoted: PropTypes.func
  },

  render () {
    return (
      <div className='player-vote'>
        <GridList className='selected-cards' cols={2} cellHeight={100}>
          {
            this.props.cards
              .map((cardUrl, i) => <VoteCard
                key={cardUrl}
                url={cardUrl}
                index={i}
                selected={this.props.votedCardIndex}
                onClick={this.handleClick.bind(this, i)}
              />)
          }
        </GridList>
      </div>
    )
  },

  handleClick (_, votedCardIndex) {
    this.props.onCardVoted(votedCardIndex)
  }
})
