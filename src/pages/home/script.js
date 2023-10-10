const loadData = () => new Date().toLocaleDateString()

const getApiFinances = async () => {
    const result = await fetch('https://apigenerator.dronahq.com/api/Ln5sqqtt/wallet_finances')
    const finances = await result.json()
    return finances
}

const loadInfo = async () => {
    const infoFinances = await getApiFinances()

    const data = loadData()
    const nameUser = localStorage.getItem('@wallet-app:UserName')
    const emailUser= localStorage.getItem('@wallet-app:UserEmail')
    
    const divInfos = document.getElementById('infos')
    const divData = document.getElementById('date')
    
    const divLetterUser = document.createElement('div')
    const letterUser = document.createElement('h2')
    const emailName = document.createElement('a')
    const exitLink = document.createElement('a')
    const textData = document.createElement('h3')
    
    divLetterUser.classList.add('letter-user')
    letterUser.innerHTML = nameUser.charAt(0)
    emailName.innerHTML = emailUser
    exitLink.classList.add('exit-account')
    exitLink.innerHTML = 'sair'
    textData.innerHTML = data
    
    divData.appendChild(textData)
    divLetterUser.appendChild(letterUser)
    divInfos.appendChild(divLetterUser)
    divInfos.appendChild(emailName)
    divInfos.appendChild(exitLink)
}

const loadFinances = (financesApi) => {
    const info = financesApi
    
    const table = document.getElementById('table-space')
    
    let revenue = 0
    let expenses = 0
    info.map((item) => {
        if(Number(item.value > 0)) revenue += Number(item.value)
        else expenses += Number(item.value)

        // create table row (tr)
        const tableRow = document.createElement('tr')
        
        // create table data (td)
        const tdCategory = document.createElement('td')
        const tdTtile = document.createElement('td')
        const tdDate = document.createElement('td')
        const tdValue = document.createElement('td')
        const tdDelete = document.createElement('td')
        
        if(item.title === 'Cartão Crédito') item.value *= -1
        
        // add info on table data (td)
        tdCategory.innerHTML = item.name
        tdTtile.innerHTML = item.title
        tdDate.innerHTML = item.date
        tdValue.innerHTML = parseFloat(item.value)
        tdDelete.innerHTML = 'Deletar'
        
        // add class on table data (td)
        tdTtile.classList = 'center'
        tdDate.classList = 'center'
        tdValue.classList = 'right'
        tdDelete.classList = 'right'
        tdDelete.id = 'delete-action'
        
        // add table data (td) on table row (tr)
        tableRow.appendChild(tdCategory)
        tableRow.appendChild(tdTtile)
        tableRow.appendChild(tdDate)
        tableRow.appendChild(tdValue)
        tableRow.appendChild(tdDelete)
        
        // add table row (tr) on table
        table.appendChild(tableRow)
    })

    // create boards: total launchers, revenues, expenses and balance
    const sectionLaunchers = document.getElementById('container-card-ficance')
    const sectionRevenues = document.getElementById('container-card-revenues')
    const sectionExpenses = document.getElementById('container-card-expenses')
    const sectionBalances = document.getElementById('container-card-balances')
    
    const textLaunchers = document.createElement('h1')
    const textRevenues = document.createElement('h1')
    const textExpenses = document.createElement('h1')
    const textBalances = document.createElement('h1')

    textLaunchers.innerHTML = financesApi.length
    textRevenues.innerHTML = `R$ ${revenue},00`
    textExpenses.innerHTML = `R$ ${expenses * -1 },00`
    textBalances.innerHTML = `R$ ${revenue - (expenses * -1)},00`
    textBalances.id = 'highlight'

    sectionLaunchers.appendChild(textLaunchers)
    sectionRevenues.appendChild(textRevenues)
    sectionExpenses.appendChild(textExpenses)
    sectionBalances.appendChild(textBalances)
}

const onCloseModal = () => {
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
}

const onOpenModal = () => {
    const modal = document.getElementById('modal')
    modal.style.display = 'flex'
}

const loadCategories = (finances) => {
    const info = finances

    const selectContainer = document.getElementById('input-category')
    info.map((item) => {
        const option = document.createElement('option')
        option.id = item.id
        for (let i = 0; i < info.length; i++) {
            if(info[i] != item.name) option.innerHTML = item.name
        }
        selectContainer.appendChild(option)
    })
}

const addItem = async (item) => {
    const response = await fetch('https://apigenerator.dronahq.com/api/Ln5sqqtt/wallet_finances',{
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin',
        headers:{
            'Content-type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(item),
        referrerPolicy: 'no-referrer'
    })
    return response.json()
}

const deleteItem = async (id) => {
    const response = await fetch(`https://apigenerator.dronahq.com/api/Ln5sqqtt/wallet_finances/${id}`,{
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers:{
            'Content-type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
    return response.json()
}

const getItemToAdd = (target) => {
    const title = target[0].value
    const value = target[1].value
    let date = target[2].value
    date = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1') // regex to transforme date style to Brazil
    const category = target[3].value

    addItem({
        title,
        value,
        date,
        name: category
    })

}

window.onload = async () => {
    const finances = await getApiFinances()
    const formAdd = document.getElementById('form-add-item')
    formAdd.onsubmit = (e) => {
        e.preventDefault()
        getItemToAdd(e.target)
    }
    loadInfo()
    loadFinances(finances)
    loadCategories(finances)
    const deleter = document.getElementById('delete-action')
}