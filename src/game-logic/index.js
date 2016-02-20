import uuid from 'uuid'
import Hashids from 'hashids'

export default class GameLogic {
  constructor (firebase) {
    this.firebase = firebase
    this.gameId = null
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

              resolve(this.gameId)
            } else {
              reject(err)
            }
          }
        )
    })
  }

  onChange (callback) {
    this.firebase
      .child(`games/${this.gameId}`)
      .on('value', snapshot => callback(snapshot.val()))
  }
}
