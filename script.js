const button = document.querySelector('button')
const textInput = document.querySelector('input[id="text"]')
const amountInput = document.querySelector('input[id="amount"]')
const entries = document.querySelector('.history .entries')

let balance = 0


// Event Listener For Clicking On Add Transaction Button
button.addEventListener('click', e => {

    // Check If Text Or Amount Inputs Empty
    if(!checkIfInputEmpty()) {

        // Add To Balance
        balance += amountInput.value
        balance = Number(balance).toFixed(2)

        // Create A New Entry
        let div = document.createElement('div')
        if (balance >= 0) div.className = 'entry income'
        else div.className = 'entry expense'
        
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