import uuid from 'uuid'
import Hashids from 'hashids'
import gifs from '../data/gif-season-1'
import colors from '../data/colors-season-1'
import shuffle from 'lodash/shuffle'

const HAND_SIZE = 5

export default class GameLogic {
  constructor (firebase) {
    this.firebase = firebase
    this.gameId = null
    this.leaderId = null
    this.cards = shuffle(gifs)
    this.colors = shuffle(colors)
    this.playerSequence = []
    this.storyTellerIndex = 0
  }

  create () {
    return new Promise((resolve, reject) => {
      this.firebase
        .child('gamesSequence')
        .transaction(
          (currentValue) => {
            return (currentValue || 0) + 1
          },
          (err, committed, snapshot) => {
            const hashids = new Hashids(uuid())

            if (committed) {
              this.gameId = hashids.encode(snapshot.val())
              this.firebase
                .child('games').child(this.gameId)
                .set({ id: this.gameId, status: 'waiting', players: {} })

              bindListeners.call(this)
              resolve(this.gameId)
            } else {
              reject(err)
            }
          }
        )
    })
  }

  onChange (callback) {
    const node = this.firebase.child(`games/${this.gameId}`)
    node.on('value', snapshot => callback(snapshot.val()))
    node.on('child_changed', snapshot => callback(snapshot.val()))
  }
}

function bindListeners () {
  this.firebase
    .child(`games/${this.gameId}/players`)
    .on('child_added', onPlayersAdded.bind(this))
}

function onPlayersAdded (snapshot) {
  const player = snapshot.val()

  this.playerSequence.push(player.id)
  this.playerSequence = shuffle(this.playerSequence)

  if (!this.leaderId) {
    saveLeader.call(this, player)
  }

  this.firebase
    .child(`games/${this.gameId}/players/${player.id}/hand`)
    .set(drawCards.call(this))

  this.firebase
    .child(`games/${this.gameId}/players/${player.id}/color`)
    .set(this.colors.shift())
}

function saveLeader (player) {
  this.leaderId = player.id

  this.firebase
    .child(`games/${this.gameId}/leaderId`)
    .set(player.id)

  this.firebase
    .child(`games/${this.gameId}/players/${player.id}/leader`)
    .set({ step: 0 })

  this.firebase
    .child(`games/${this.gameId}/players/${player.id}/leader`)
    .on('child_changed', onNextGameStep.bind(this))
}

function drawCards () {
  let hand = []

  for (var i = 0; i < HAND_SIZE; i++) {
    hand.push(this.cards.shift())
  }

  return hand
}

function onNextGameStep (snapshot) {
  const step = snapshot.val()

  switch (step % 4) {
    case 0:
      return step !== 0 && calculateScore.call(this)

    case 1:
      return chooseNextStoryTellerIndex.call(this)
  }
}

function calculateScore () {
  // body...
}

function chooseNextStoryTellerIndex () {
  const previousStoryTeller = this.playerSequence[this.storyTellerIndex]

  this.storyTellerIndex = (this.storyTellerIndex + 1) % this.playerSequence.length

  const newStoryTeller = this.playerSequence[this.storyTellerIndex]

  this.firebase
    .child(`games/${this.gameId}/players/${previousStoryTeller}/isStoryTeller`)
    .set(false)

  this.firebase
    .child(`games/${this.gameId}/players/${newStoryTeller}/isStoryTeller`)
    .set(true)
}
