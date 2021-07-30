
const userService = {
    async login({user, password}) {
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
        return await res.json()
    },
    async register({user, password}){
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
        return await res.json()
    },
    async userExist({user}){
        const res = await fetch('/api/usersHandler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "verifyUser", username: user
            })})
        return await res.json()
    }
}
export default userService