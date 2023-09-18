const getApi = async () => {
    const result = await fetch(`https://apigenerator.dronahq.com/api/tilTUhSB/wallet_users`)
    const users = await result.json()
    return users
}

const clickLogin = async () => {
    const email = document.getElementById('input-email').value

    if(email.length < 7 || !email.includes('@')) {
        alert('email inválido')
        email.value = ''
        return
    }

    try {
        const users = await getApi()
        let userName
        let userId
        users.map((user) => {
            if(user.email === email){
                userName = user.name
                userId = user.id
            }
        })
        if(userName === undefined || userId === undefined) {
            alert('usuario nao encontrado :(')
            return
        }
        localStorage.setItem('@wallet-app:UserEmail', email)
        localStorage.setItem('@wallet-app:UserName', userName)
        localStorage.setItem('@wallet-app:UserId', userId)
        window.open('./src/pages/home/index.html', '_self')
    } catch (error) {
        console.log({error})
    }
}