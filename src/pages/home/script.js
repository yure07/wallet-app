const loadData = () => {
    const data = new Date()
    const formated = data.toLocaleDateString()
    return formated
}

const loadInfo = () => {
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
    divLetterUser.appendChild(letterUser)
    textData.innerHTML = data
    divData.appendChild(textData)
    
    divInfos.appendChild(divLetterUser)
    divInfos.appendChild(emailName)
    divInfos.appendChild(exitLink)

}

const getApiFinances = async () => {
    const result = await fetch('https://apigenerator.dronahq.com/api/g6j-XMrN/wallet_financies')
    const finances = await result.json()
    return finances
}

const loadFinances = (financesApi) => {
    const info = financesApi
    /*
    <tr>
        <td>Roupas</td>
        <td class="center">Compras</td>
        <td class="center">20/09/2022</td>
        <td class="right">R$ 199.99</td>
        <td class="right">Deletar</td>
    </tr>
    */

    const table = document.getElementById('table-space')

    info.map((item) => {
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

        // add table data (td) on table row (tr)
        tableRow.appendChild(tdCategory)
        tableRow.appendChild(tdTtile)
        tableRow.appendChild(tdDate)
        tableRow.appendChild(tdValue)
        tableRow.appendChild(tdDelete)

        // add table row (tr) on table
        table.appendChild(tableRow)
    })
    console.log(info)
}

window.onload = async () => {
    loadInfo()
    const finances = await getApiFinances()
    loadFinances(finances)
}