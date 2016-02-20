import { render } from 'react-dom'
import React from 'react'
import Firebase from 'firebase'

import './player.scss'
import Player from './containers/player'

const firebase = new Firebase('https://ss16-macaco-frito.firebaseio.com/')

render(<Player firebase={firebase}/>, document.getElementById('player-screen-container'))
