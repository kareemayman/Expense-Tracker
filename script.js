const button = document.querySelector('button')
const textInput = document.querySelector('input[id="text"]')
const amountInput = document.querySelector('input[id="amount"]')


// Event Listener For Clicking On Add Transaction Button
button.addEventListener('click', e => {

    // Check If Text Or Amount Inputs Empty
    if(!checkIfInputEmpty()) {
        
    }
})

function checkIfInputEmpty() {
    if (textInput.value === "" || amountInput.value === "") {
        alert("Please Enter Text & Amount Before Adding Transaction")
        return true
    }
    return false
}