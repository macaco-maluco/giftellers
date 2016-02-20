import uuid from 'uuid'
import Hashids from 'hashids'

export default class GameLogic {
  constructor (firebase) {
    this.firebase = firebase
    this.gameId = null
    this.leaderId = null
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
  if (!this.leaderId) {
    saveLeader.apply(this, [snapshot.val()])
  }
}

function saveLeader (player) {
  this.leaderId = player.id
  this.firebase
    .child(`games/${this.gameId}/leaderId`)
    .set(player.id)
}
