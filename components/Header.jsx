import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { FaHandPointLeft, FaRedhat, FaThemeco} from 'react-icons/fa'

export default function Header({value}) {
  
  const {theme, setTheme} = value 

  const handleChange = ({target}) => {
    setTheme(prevTheme => {
      if (prevTheme === 'dark'){
        window.localStorage.setItem('theme', 'light')
        return 'light'
      }
      window.localStorage.setItem('theme', 'dark')
      return 'dark'
    })
  }

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
        <nav>
        <Link href = "/signup">
          <a>
            <p>Signup</p>
          </a>
        </Link>
        </nav>
        <nav>
        <Link href = "/login">
          <a>
            <p>Login</p>
          </a>
        </Link>
        </nav>
      
      <input type="checkbox" checked={theme==='dark'?false:true} onChange={handleChange}/>
      
    </header>
  )
}