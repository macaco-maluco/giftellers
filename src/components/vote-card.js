import React, { PropTypes } from 'react'
import GridTile from 'material-ui/lib/grid-list/grid-tile'

export default React.createClass({
  propTypes: {
    url: PropTypes.string,
    index: PropTypes.number,
    selected: PropTypes.number,
    onClick: PropTypes.func
  },

  render () {
    const isSelected = this.props.index === this.props.selected
    const title = (this.props.index !== null || this.props.index !== undefined)
      ? <span className='title'>{`#${this.props.index}`}</span>
      : null

    return (
      <div className={`vote-card ${isSelected ? 'selected' : ''}`} onClick={this.handleClick}>
        <GridTile key={this.props.url} title={title}>
          <img src={this.props.url} />
        </GridTile>
      </div>
    )
  },

  handleClick () {
    this.props.onClick(this.props.index)
  }
})
