export default function drawNextCards (cards, game) {
  const playersArray = Object.keys(game.players).map(id => game.players[id])

  playersArray.forEach(player => {
    // remove the selected card
    player.hand = player.hand.filter(card => card.url !== player.selectedCard)

    // unselect it
    delete player.selectedCard

    // clear previous voted card
    delete player.votedCardIndex

    // add a new card from the deck
    player.hand.push(cards.shift())
  })

  return game
}
