import styles from '../styles/Footer.module.css'
import Link from 'next/link'
import { FaDiscord,FaInstagram,FaGithub,FaSteam,FaYoutube,FaTwitter, FaTwitch, FaGamepad} from 'react-icons/fa'

function LinkIcon({ href, children }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer">
          {children}
      </a>
    </li>
  )
}

export default function Footer() {
  return (
    <footer className={styles.container}>
      <ul className={styles['container-icons']}>
          <LinkIcon href="https://mqmotakustore.herokuapp.com" ><FaDiscord/></LinkIcon>
          <LinkIcon href="https://www.instagram.com/fran.villella/" ><FaInstagram/></LinkIcon>
          <LinkIcon href="https://github.com/LucasTorres19/M4F14" ><FaGithub/></LinkIcon>
          <LinkIcon href="https://steamcommunity.com/groups/M4F14UWU" ><FaSteam/></LinkIcon>
          <LinkIcon href="https://www.youtube.com/channel/UC3NkyGdVS727tgzmxUajBjg" ><FaYoutube/></LinkIcon>
          <LinkIcon href="https://twitter.com/dios_wachi" ><FaTwitter/></LinkIcon>
          <LinkIcon href="https://www.twitch.tv/nasaggg" ><FaTwitch/></LinkIcon>
          <LinkIcon href="https://thiago-cpu.github.io/Toagames/" ><FaGamepad/></LinkIcon>
      </ul>
      <p className={styles.rights}>© 2015 - {new Date().getFullYear()}, M4F14 Ltd, All rights reserved</p>
    </footer>
  ) 
}
