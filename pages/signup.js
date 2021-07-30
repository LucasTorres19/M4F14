import styles from '../styles/Signup.module.css'
import userService from '../services/user'
import {useRef} from 'react'
export default function Signup(){
    let user = ""
    const $pass = useRef(null)
    
    const registrarse = async e =>{
        e.preventDefault()
        const password = $pass.current.value
        const res = await userService.register({user, password})
        if(res.userCreated){
            alert("usuario creado correctamente")
        } else {
            alert("El usuario ya existe o hubo un error")
        }
    }
    const handleChangeUsername = async evt =>{
        user = evt.target.value
        const res = await userService.userExist({user})
        if (res.issetUser){
            console.log("el usuario ya existe")
        } else {
            console.log("usuario disponible")
        }
    }
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>           
                <span >Signup</span>
                <input className={styles.inputForm} type="text" name="username" placeholder="Username" onChange={handleChangeUsername}></input>
                <input className={styles.inputForm} ref={$pass} type="password" name="password" placeholder="Password"></input>
                <input type="button" onClick={registrarse} value="Signup"></input>
            </div>
        </main>
    )
}