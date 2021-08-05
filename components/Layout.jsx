
import Footer from './Footer'
import Header from './Header'
import styles from '../styles/Layout.module.css'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
  const [theme, setTheme] = useState('dark')
  useEffect(()=>{
    console.log(window.localStorage.getItem('theme'))
    setTheme(()=>{
      if(window.localStorage.getItem('theme')) return window.localStorage.getItem('theme') 
      window.localStorage.setItem('theme', 'dark')
      return 'dark'
    })
    
  },[])

  

  return (
    <div className={styles.container} datatheme={theme}>
      <Header value={{setTheme, theme}}/>
      {children}
      <Footer/>
    </div>
  )
}