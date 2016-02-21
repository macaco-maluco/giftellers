const MAX_SCORE = 21

export default function calculateScore (game) {
  const { shuffledVotingCards, players } = game
  const playersArray = Object.keys(players).map(id => players[id])
  const storyTeller = playersArray.find(player => player.isStoryTeller)

  playersArray.forEach(player => player.score = player.score || 0)

  shuffledVotingCards.forEach((card, index) => {
    const voters = playersArray
      .filter(player => !player.isStoryTeller && player.votedCardIndex === index)

    if (card === storyTeller.selectedCard) {
      voters.forEach(voter => voter.score < MAX_SCORE ? voter.score += 3 : null)

      // not everyone guessed correctly
      if (voters.length !== playersArray.length - 1 &&
          voters.length > 0 &&
          storyTeller.score < MAX_SCORE) {
        storyTeller.score += 3
      }
    } else {
      const cardOwner = playersArray.find(player => player.selectedCard === card)

      voters
        .filter(voter => voter !== cardOwner)
        .forEach(voter => cardOwner.score < MAX_SCORE ? cardOwner.score += 1 : null)
    }
  })

  return game
}
