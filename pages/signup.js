import styles from '../styles/Signup.module.css'

export default function Signup(){
    let [user,password] = ""
    
    
    const registrarse = async e =>{

        const res = await fetch('/api/usersHandler',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "register",
                username: user,
                password: password
            })})
        const resjson = await res.json()
        if(resjson.userCreated){
            alert("usuario creado correctamente")
        } else {
            alert("El usuario ya existe o hubo un error")
        }
    }
    const handleChangeUsername = async evt =>{
        user = evt.target.value
        const res = await fetch('/api/usersHandler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "verifyUser", username: user
            })})
        const resjson = await res.json()
        if (resjson.issetUser){
            console.log("el usuario ya existe")
            //el usuario ya existe
        } else {
            console.log("usuario disponible")
        }
    }
    const handleChangePassword = evt =>{
        password = evt.target.value
    }
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>           
                <span >Signup</span>
                <input className={styles.inputForm} type="text" name="username" placeholder="Username" onChange={handleChangeUsername} value={user}></input>
                <input className={styles.inputForm} type="password" name="password" placeholder="Password" onChange={handleChangePassword} value={password}></input>
                <input type="button" onClick={registrarse} value="Signup"></input>
            </div>
        </main>
    )
}