import drawNextCards from './draw-next-cards'

describe('draw next cards', () => {
  it('should remove the selected card from the player hand and add another from the deck', () => {
    const cards = [
      { url: 'card-20' },
      { url: 'card-21' },
      { url: 'card-22' },
      { url: 'card-23' },
      { url: 'card-24' },
      { url: 'card-25' }
    ]

    const cardsLessDrawn = [
      { url: 'card-22' },
      { url: 'card-23' },
      { url: 'card-24' },
      { url: 'card-25' }
    ]

    const game = {
      players: {
        'player-1': {
          id: 'player-1',
          selectedCard: 'card-1',
          hand: [
            { url: 'card-1' },
            { url: 'card-2' },
            { url: 'card-3' },
            { url: 'card-4' }
          ],
          isStoryTeller: true
        },

        // correct guess
        'player-2': {
          id: 'player-2',
          selectedCard: 'card-7',
          hand: [
            { url: 'card-5' },
            { url: 'card-6' },
            { url: 'card-7' },
            { url: 'card-8' }
          ],
          votedCardIndex: 3
        }
      }
    }

    const gameWithDrawnCards = drawNextCards(cards, game)
    expect(gameWithDrawnCards).toEqual(game)

    expect(game.players['player-1'].selectedCard).toEqual(undefined)
    expect(game.players['player-1'].hand.map(card => card.url)).toEqual(['card-2', 'card-3', 'card-4', 'card-20'])

    expect(game.players['player-2'].selectedCard).toEqual(undefined)
    expect(game.players['player-2'].hand.map(card => card.url)).toEqual(['card-5', 'card-6', 'card-8', 'card-21'])

    expect(cards).toEqual(cardsLessDrawn)
  })
})
