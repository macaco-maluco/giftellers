import calculateScore from './calculate-score'

/**
 * Story teller:
 *   3 points if someone votes on him card
 *   0 points if everyone got right
 *
 * Player
 *   3 points if votes in the story teller card
 *   1 point for each player that voted on his card
 *   0 points if votes in its own card
 */

describe('calculate score', () => {

  describe('given an "average" game', () => {
    let game

    beforeEach(() => {
      game = {
        shuffledVotingCards: [
          'card-5', // #0
          'card-2', // #1
          'card-3', // #2
          'card-1', // #3
          'card-4'  // #4
        ],

        players: {
          'player-1': {
            id: 'player-1',
            selectedCard: 'card-1',
            isStoryTeller: true
          },

          // correct guess
          'player-2': {
            id: 'player-2',
            selectedCard: 'card-2',
            votedCardIndex: 3
          },

          // voted on self
          'player-3': {
            id: 'player-3',
            selectedCard: 'card-3',
            votedCardIndex: 2
          },

          // voted on player-3 card
          'player-4': {
            id: 'player-4',
            selectedCard: 'card-4',
            votedCardIndex: 2
          },

          // voter on self
          'player-5': {
            id: 'player-5',
            selectedCard: 'card-5',
            votedCardIndex: 0
          }
        }
      }
    })

    it('should score 3 points to the story teller for each correct player guess', () => {
      const updatedGame = calculateScore(game)
      expect(updatedGame.players['player-1'].score).toEqual(3)
    })

    it('should score 3 points to the player guessed correctly', () => {
      const updatedGame = calculateScore(game)
      expect(updatedGame.players['player-2'].score).toEqual(3)
    })

    it('should score 1 points to the player that received a vote from another player', () => {
      const updatedGame = calculateScore(game)
      expect(updatedGame.players['player-3'].score).toEqual(1)
    })

    it('should score 0 points to the player that guessed incorrectly', () => {
      const updatedGame = calculateScore(game)
      expect(updatedGame.players['player-4'].score).toEqual(0)
    })

    it('should score 0 points to the player that voted on himself', () => {
      const updatedGame = calculateScore(game)
      expect(updatedGame.players['player-5'].score).toEqual(0)
    })
  })
})
