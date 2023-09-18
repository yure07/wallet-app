const checkUserExist = async (email) => {
    const result = await fetch(`https://apigenerator.dronahq.com/api/tilTUhSB/wallet_users`)
    const users = await result.json() 
    let alreadyExist = false
    users.map((user) => {
        if(user.email === email) {
            alreadyExist = true
        }
    })
    return alreadyExist
}

const registerOnApi = async (name, email) => {
    try {
        const userExit = await checkUserExist(email)
        console.log(userExit)
        if(userExit) {
            alert('usuario ja existe')
            return;
        }

        const data = {
            name: name,
            email: email
        }
    
        const response = await fetch(`https://apigenerator.dronahq.com/api/tilTUhSB/wallet_users`,{
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'same-origin',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const user = await response.json()
        return user
        
    } catch (error) {
        return {error}
    }
}

const onRegister = async () => {
    const name = document.getElementById('input-name').value
    const email = document.getElementById('input-email').value

    if(name.lenght < 3) {
        alert('nome deve ter mais de 2 letras')
        return;
    }

    if(email.length < 5 || !email.includes('@')){
        alert('email invalido')
        return;
    }

    const result = await registerOnApi(name, email)

    if(result.error){
        alert("erro ao registrar")
        return;
    }

    localStorage.setItem('@wallet-app:UserEmail', result.email)
    localStorage.setItem('@wallet-app:UserName', result.name)
    localStorage.setItem('@wallet-app:UserId', result.id)
    window.open('../home/index.html', '_self')
}

window.onload = () => {
    const form = document.getElementById('form-register')
    form.onsubmit = (e) => {
        e.preventDefault()
        onRegister()
    }
}