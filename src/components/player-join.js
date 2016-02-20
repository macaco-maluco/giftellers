import React from 'react'
import { PropTypes } from 'react'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import './player-join.scss'

export default React.createClass({
  propTypes: {
    onJoin: PropTypes.func
  },

  render () {
    return (
      <Card className='player-join' style={{minWidth: '25%', textAlign: 'center', zoom: 1.5}}>
        <CardText>
          <TextField ref='gameId' hintText='Game ID'/><br/>
          <RaisedButton label='Join' primary onClick={this.handleJoin}/>
        </CardText>
      </Card>
    )
  },

  handleJoin () {
    this.props.onJoin(this.refs.gameId.getValue())
  }
})
