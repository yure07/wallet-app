const loadData = () => {
    const data = new Date()
    const formated = data.toLocaleDateString()
    return formated
}

const loadInfo = () => {
    const nameUser = localStorage.getItem('@wallet-app:UserName')
    const emailUser= localStorage.getItem('@wallet-app:UserEmail')
    
    const divInfos = document.getElementById('infos')
    
    const divLetterUser = document.createElement('div')
    const letterUser = document.createElement('h2')
    const emailName = document.createElement('a')
    const exitLink = document.createElement('a')
    
    divLetterUser.classList.add('letter-user')
    letterUser.innerHTML = nameUser.charAt(0)
    emailName.innerHTML = emailUser
    exitLink.classList.add('exit-account')
    exitLink.innerHTML = 'sair'
    divLetterUser.appendChild(letterUser)
    
    divInfos.appendChild(divLetterUser)
    divInfos.appendChild(emailName)
    divInfos.appendChild(exitLink)
}

window.onload = () => {
    loadInfo()
}

const data = loadData()