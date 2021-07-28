import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { FaRedhat} from 'react-icons/fa'

export default function Header() {
  return (
    <header className={styles.container}>
      <Link href="/" >
        <a>
          <FaRedhat className={styles.FaRedHat}/>
          <p>M4FI4</p>
        </a>
      </Link>
      <nav>
        <Link href = "/plays">
          <a>
            <p>Plays</p>
          </a>
        </Link>
        </nav>
        <nav>
        <Link href = "/chismes">
          <a>
            <p>Chismes</p>
          </a>
        </Link>
      </nav>
      
      
    </header>
  )
}