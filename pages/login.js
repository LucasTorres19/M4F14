import styles from '../styles/Signup.module.css'

export default function Signup(){
    let [user,password] = ""
    
    
    const loguearse = async e =>{
        const res = await fetch('/api/usersHandler',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({
            query: "login",
            username: user,
            password: password
        })})
        const resJson = await res.json()
    }
    const handleChangeUsername = async evt =>{
        user = evt.target.value
    }
    const handleChangePassword = evt =>{
        password = evt.target.value
    }
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>           
                <span >Login</span>
                <input className={styles.inputForm} type="text" name="username" placeholder="Username" onChange={handleChangeUsername} value={user}></input>
                <input className={styles.inputForm} type="password" name="password" placeholder="Password" onChange={handleChangePassword} value={password}></input>
                <input type="button" onClick={loguearse} value="Login"></input>
            </div>
        </main>
    )
}