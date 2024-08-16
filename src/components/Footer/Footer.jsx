import React from 'react'
import './Footer.css'
import youtube_icon from '../..//assets/youtube_icon.png'
import twitter_icon from '../..//assets/twitter_icon.png'
import instagram_icon from '../..//assets/instagram_icon.png'
import facebook_icon from '../..//assets/facebook_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-icons'>
        <img src={facebook_icon} alt="" />
        <img src={instagram_icon} alt="" />
        <img src={twitter_icon} alt="" />
        <img src={youtube_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>help center</li>
        <li>giftcards</li>
        <li>jobs</li>
        <li>terms of use</li>
        <li>Legal notices</li>
        <li>Conttact us</li>
      </ul>
      <p className='cp-text'>@ 1997-2023 Netflix,Inc.</p>
    </div>
  )
}

export default Footer
