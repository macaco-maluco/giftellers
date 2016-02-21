import 'babel-core/browser-polyfill'

export default function calculateScore ({ shuffledVotingCards, players }) {
  const playersArray = Object.keys(players).map(id => players[id])
  const storyTeller = playersArray.find(player => player.isStoryTeller)

  shuffledVotingCards.forEach((card, index) => {
    const voters = playersArray
      .filter(player => !player.isStoryTeller && player.votedCardIndex === index)

    if (card === storyTeller.selectedCard) {
      voters.forEach(voter => voter.score += 3)

      // not everyone guessed correctly
      if (voters.length !== playersArray.length - 1 && voters.length > 0) {
        storyTeller.score += 3
      }
    } else {
      const cardOwner = playersArray.find(player => player.selectedCard === card)

      voters
        .filter(voter => voter !== cardOwner)
        .forEach(voter => cardOwner.score += 1)
    }
  })

  return players
}
