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

    return (
      <div className={`vote-card ${isSelected ? 'selected' : ''}`}
           onClick={this.handleClick}>
        <GridTile key={this.props.url}
                  title={<span className='title'>{`#${this.props.index}`}</span>}>
            <img src={this.props.url} />
        </GridTile>
      </div>
    )
  },

  handleClick () {
    this.props.onClick(this.props.index)
  }
})
