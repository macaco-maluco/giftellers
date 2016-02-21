import React from 'react'
import { Footer, Hero, HorizontalSplit, Page, Section } from 'neal-react'

import background from './landing-page.gif'

const brandName = 'Giftellers'

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Stockholm, Sweden
  </address>
)

export default (props) => {
  return (
    <Page>
      <Hero backgroundImage={background}
        className='text-xs-center'>
        <h1 className='display-4'> Giftellers </h1>
        <p className='lead'>A couch card-game to be played with friends!</p>
         <p>
          <a href='/big-screen.html' className='btn btn-white'>
            Start the game!
          </a>
        </p>
      </Hero>

      <Section>
        <HorizontalSplit padding='md'>
          <div>
            <p className='lead'>Storytelling on GIFs</p>
            <p>Inspired on <a href='https://en.wikipedia.org/wiki/Dixit_%28card_game%29'>Dixit</a>, <strong>Giftellers</strong> is a spin on the classic card game. Using a deck of GIF cards, players select cards that match a title suggested by the 'storyteller' then latter attempt to guess which card the 'storyteller' selected.</p>
          </div>
          <div>
            <p className='lead'>Couch game</p>
            <p>Invite your friends over and play a good old 'couch game'. Giftellers is to be played with a TV and smartphones. There is even a <strong>game leader</strong> that controlls when the game advances.</p>
          </div>
          <div>
            <p className='lead'>This is real life</p>
            <p>For real! Get your friends together, talk and have some fun! Giftellers doesn't have matchmaking. It is build to be played in the same room.</p>
          </div>
        </HorizontalSplit>
      </Section>

      <Section heading='Start playing now!' className='gray'>
        <p>Giftellers is split in two parts:</p>
        <ul>
          <li><strong>Big screen</strong> acts as the "table", where all the "cards" will be laid;</li>
          <li><strong>Player remote</strong> are separated "card hands" that each player needs to have open on their smartphones. One of the remotes will also act as the <strong>game leader</strong> controlling the advancement of the game.</li>
        </ul>

        <p>You will need both applications open on different screens and at leats 3 people to be able to play.</p>
        <p>
          The game is made to be <strong>controlled manually</strong>. There is a leader per match that controlls when the game can move to a next step. The match leader is the first player to join a given game.
        </p>
        <p>
          <a href='/big-screen.html' className='btn btn-primary btn-ghost' data-toggle='modal' data-target='#signup-modal'>Start new game on a Big Screen</a>
        </p>
        <p>
          <a href='/player.html' className='btn btn-primary btn-ghost' data-toggle='modal' data-target='#signup-modal'>Join an existing game via the Player Remote</a>
        </p>
      </Section>

      <Section heading='Meet the makers'>
        <p>Game was created and built during the <a hred='https://2016.staticshowdown.com/'>Static showdown 2016</a> hackathon by:</p>
        <ul className='creators'>
          <li><img className='creator' src='https://s.gravatar.com/avatar/d0cb5e66c31a8c5b2ef0b8f57804d946?s=50'/><a href='http://github.com/pirelenito/'>Paulo Ragonha</a></li>
          <li><img className='creator' src='https://s.gravatar.com/avatar/141f83b6b19379276350a4c7d1a7175c?s=50'/><a href='https://github.com/tulios'>Tulio Ornelas</a></li>
        </ul>
      </Section>

      <Footer brandName={brandName}
        githubUrl='https://github.com/staticshowdown/ss16-macaco-frito'
        address={businessAddress} />
    </Page>
  )
}
