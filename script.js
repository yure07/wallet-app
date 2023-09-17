console.log('teste')

const clickLogin = () => {
    const email = document.getElementById('input-email').value

    if(email.lenght < 7 || !email.includes('@')) {
        alert('email inválido')
        email.value = ''
        return
    }

    localStorage.setItem('@wallet-app:email', email)
    email.value = ''
    window.open('./src/pages/home/index.html', '_self')
}