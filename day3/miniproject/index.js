const billInput = document.getElementById("billInput");
const tipInput = document.getElementById("tipInput");
const result = document.getElementById("result");
const button = document.getElementById("calculateBtn");

if(billInput.value == "" || tipInput.value == ""){
    button.disabled = true
}

button.addEventListener("click", function () {
    calculate();
});

let calculate = () => {
    const bill = parseFloat(billInput.value);
    const tipPercent = parseFloat(tipInput.value);

    if (isNaN(bill) || isNaN(tipPercent)) {
        result.textContent = "Please enter valid numbers.";
        return;
    }

    const tip = bill * (tipPercent / 100);
    const total = bill + tip;

    result.textContent = `Tip: RM${tip.toFixed(2)} | Total: RM${total.toFixed(2)}`;
}

billInput.oninput = () => {
    if(billInput.value != "" && tipInput.value != ""){
        button.disabled = false
        calculate();
    }else{
        button.disabled = true
    }
}

tipInput.onchange = () => {
    if(billInput.value != "" && tipInput.value != ""){
        button.disabled = false
        calculate();
    }else{
        button.disabled = true
    }
}