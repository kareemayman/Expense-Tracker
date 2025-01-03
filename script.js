const form = document.querySelector('form')
const textInput = document.querySelector('input[id="text"]')
const amountInput = document.querySelector('input[id="amount"]')
const entries = document.querySelector('.history .entries')
const balanceHTML = document.querySelector('.balance h1')
const incomeHTML = document.querySelector('.income-expense .income h2:last-of-type')
const expenseHTML = document.querySelector('.income-expense .expense h2:last-of-type')

// Get Items From Local Storage
let balance = +localStorage.getItem('balance') || 0
let income = +localStorage.getItem('income') || 0
let expense = +localStorage.getItem('expense') || 0
let entriesInStorage = JSON.parse(localStorage.getItem('entries')) || []

// Display Items From Local Storage If Available
loadFromLocalStorage()


// Event Listener For Clicking On Add Transaction Button
form.addEventListener('submit', e => {

    // Prevent Submit
    e.preventDefault()

    // Check If Text Or Amount Inputs Empty
    if(!checkIfInputEmpty()) {

        // Add To Balance
        balance = (+balance + +amountInput.value).toFixed(2)
        balanceHTML.textContent = `$${balance}`






        // Create A New Entry
        let div = document.createElement('div')
        if (amountInput.value >= 0) {
            div.className = 'entry income'

            // Add Money To Income
            income = (+income + +amountInput.value).toFixed(2)
            incomeHTML.textContent = `$${income}`
        }
        else {
            div.className = 'entry expense'

            // Add Money To Expense
            expense = (+expense + -amountInput.value).toFixed(2)
            expenseHTML.textContent = `$${expense}`
        }
        
        // Add Text, Amount To Entry
        div.innerHTML = `<span class="entry-name">${textInput.value}</span>
                    <span class="amount">${amountInput.value >= 0 ? `+${amountInput.value}` : amountInput.value}</span>
                    <span class='delete'>X</span>`

        // Add ID
        div.dataset.entryId = crypto.randomUUID()
        
        // Append Entry To Entries Div
        entries.append(div)

        // Saving The Entry In Local Storage
        let obj = new Object()
        obj.amount = amountInput.value
        obj.name = textInput.value
        obj.id = div.dataset.entryId

        entriesInStorage.push(obj)
        localStorage.setItem('entries', JSON.stringify(entriesInStorage))






        // Clear Inputs
        amountInput.value = ""
        textInput.value = ""

        // Saving New Balance, Income, Expense In Local Storage
        localStorage.setItem('balance', balance)
        localStorage.setItem('income', income)
        localStorage.setItem('expense', expense)
    }
})

// Event For Clicking On Entries Delete Button
entries.addEventListener('click', e => {

    // Check If Delete Button Was Pressed
    if (e.target.matches('.entry .delete')) {
        // Selecting Parent Entry
        const entry = e.target.closest('.entry')
        const entryAmount = +entry.querySelector('.amount').textContent
        
        // Recalculate Balance
        balance = (+balance - +entryAmount).toFixed(2)
        balanceHTML.textContent = `$${balance}`

        // Recalculate Income / Expense
        if (entry.classList.contains('income')) {

            income = (+income - +entryAmount).toFixed(2)
            incomeHTML.textContent = `$${income}`
        } else {

            expense = (+expense + +entryAmount).toFixed(2)
            expenseHTML.textContent = `$${expense}`
        }

        // Saving The New Balance, Income, & Expense In Local Storage
        localStorage.setItem('balance', balance)
        localStorage.setItem('income', income)
        localStorage.setItem('expense', expense)

        // Deleting Entry From Local Storage
        let entryId = entry.dataset.entryId

        console.log(entryId)

        entriesInStorage = JSON.parse(localStorage.getItem('entries'))

        let newEntries = entriesInStorage.filter(ent => {
            return (ent.id != entryId)
        })

        localStorage.setItem('entries', JSON.stringify(newEntries))

        // Deleting The Entry
        entry.remove()
    }
})

function checkIfInputEmpty() {
    if (textInput.value === "" || amountInput.value === "") {
        alert("Please Enter Text & Amount Before Adding Transaction")
        return true
    }
    return false
}

// Function To Render Items From Local Storage
function loadFromLocalStorage() {
    balanceHTML.textContent = `$${balance.toFixed(2)}`
    incomeHTML.textContent = `$${income.toFixed(2)}`
    expenseHTML.textContent = `$${expense.toFixed(2)}`

    entriesInStorage.forEach(entry => {
        let div = document.createElement('div')
        if (Number(entry.amount) >= 0) {
            div.className = 'entry income'
        }
        else {
            div.className = 'entry expense'
        }
        // Add Text, Amount To Entry
        div.innerHTML = `<span class="entry-name">${entry.name}</span>
                    <span class="amount">${entry.amount >= 0 ? `+${entry.amount}` : entry.amount}</span>
                    <span class='delete'>X</span>`

        // Add Id To Entry
        div.dataset.entryId = entry.id

        // Append Entry To Entries Div
        entries.append(div)
    })
}