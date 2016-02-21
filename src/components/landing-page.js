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
            <p>Inspired on <a href='https://en.wikipedia.org/wiki/Dixit_%28card_game%29'>Dixit</a>, Giftellers is a game with a deck of GIF cards, then players select cards that match a title suggested by the 'storyteller', and attempt to guess which card the 'storyteller' selected.</p>
          </div>
          <div>
            <p className='lead'>Couch game</p>
            <p>Invite your frinds over and play a good old 'couch game'. Giftellers is to be played with a TV and smartphones.</p>
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
          <li>Big screen</li>
          <li>Player remote</li>
        </ul>

        <p>You will need both open on different screens and at leats 3 people to be able to play.</p>
        <p>
          <a href='/big-screen.html' className='btn btn-primary btn-ghost' data-toggle='modal' data-target='#signup-modal'>Big screen</a>
        </p>
        <p>
          <a href='/player.html' className='btn btn-primary btn-ghost' data-toggle='modal' data-target='#signup-modal'>Player remote</a>
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
