import styles from '../styles/Signup.module.css'
import userService from '../services/user.js'
import {useRef} from 'react'
export default function Signup(){
    const $user = useRef(null)
    const $pass = useRef(null)
    
    const loguearse = async e =>{
        e.preventDefault()
        const user = $user.current.value
        const password = $pass.current.value
        const res = await userService.login({user, password})
    }
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>           
                <span >Login</span>
                <input className={styles.inputForm} ref={$user} type="text" name="username" placeholder="Username"></input>
                <input className={styles.inputForm} ref={$pass} type="password" name="password" placeholder="Password"></input>
                <input type="button" onClick={loguearse} value="Login"></input>
            </div>
        </main>
    )
}