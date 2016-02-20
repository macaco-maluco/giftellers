import { render } from 'react-dom'
import React from 'react'
import Firebase from 'firebase'

import BigScreen from './components/big-screen'

const firebase = new Firebase('https://ss16-macaco-frito.firebaseio.com/')

render(<BigScreen firebase={firebase}/>, document.getElementById('big-screen-container'))
