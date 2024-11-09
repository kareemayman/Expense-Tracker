const button = document.querySelector('button')
const textInput = document.querySelector('input[id="text"]')
const amountInput = document.querySelector('input[id="amount"]')
const entries = document.querySelector('.history .entries')
const balanceHTML = document.querySelector('.balance h1')
const incomeHTML = document.querySelector('.income-expense .income h2:last-of-type')
const expenseHTML = document.querySelector('.income-expense .expense h2:last-of-type')

let balance = 0
let income = 0
let expense = 0


// Event Listener For Clicking On Add Transaction Button
button.addEventListener('click', e => {

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
                    <span class="amount">${amountInput.value >= 0 ? `+${amountInput.value}` : amountInput.value}</span>`

        // Append Entry To Entries Div
        entries.append(div)

        // Clear Inputs
        amountInput.value = ""
        textInput.value = ""
    }
})

function checkIfInputEmpty() {
    if (textInput.value === "" || amountInput.value === "") {
        alert("Please Enter Text & Amount Before Adding Transaction")
        return true
    }
    return false
}