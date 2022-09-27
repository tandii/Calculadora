let historicContent = document.querySelector('#historic-content')
let historicHeader = document.querySelector('#historic-header')
let historicBtn = document.querySelector('#historic-btn')
let historicBtnClose = document.querySelector('#historic-btn-close')
let container = document.querySelector('#container')
let moonIcon = document.querySelector('#moon-icon')
let sunIcon = document.querySelector('#sun-icon')
let table = document.getElementsByTagName('table')
let inputDisplay = document.getElementById('input-display')
let btnNumber = document.getElementsByClassName('btn-number')
let btnDelete = document.getElementById('btn-delete')
let historicElement = document.getElementById('reminder')
let btnOperationSymbol = document.getElementsByClassName('btn-operation-symbol')
const btnDarkMode = document.querySelector('#dark-mode-btn')
const darkModeContainer = document.querySelector('#dark-mode-container')
const btnPoint = document.querySelector('#btn-point')
const btnClear = document.querySelector('#btn-clear')
const btnCalculate = document.querySelector('#btn-calculate')
const btnSquareRoot = document.querySelector('#btn-square-root')
const display = document.querySelector('#display')

let historicContentIsDisplayBlock = false
let keyName = ''
let accountResult = 0
let isCalculated = false
let numberToBeDeleted = ''

inputDisplay.value = 0

historicBtn.onclick = () => {
    if (historicContentIsDisplayBlock == true) {
        historicContent.style.display = 'none'
        historicHeader.style.display = 'none'
        historicContentIsDisplayBlock = false
    } else {
        historicContent.style.display = 'block'
        historicHeader.style.display = 'flex'
        historicBtn.style.display = 'none'
        historicContentIsDisplayBlock = true
        if (window.screen.width <= 768) {
            container.style.height = '120vh'
        }
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    keyName = key
})

inputDisplay.addEventListener("paste", function (e) {
    e.preventDefault()
})

inputDisplay.onkeypress = function (e) {
    var chr = String.fromCharCode(e.which);
    if ("1234567890+-/%.x*#".indexOf(chr) < 0)
        return false;
}

display.onclick = () => {
    inputDisplay.focus()
    inputDisplay.click()
}

inputDisplay.onfocus = () => {
    display.style.border = '1px solid rgb(224, 112, 6)'
    inputDisplay.click()

    window.onkeydown = function () {
        var key = event.keyCode || event.charCode || e.which;
        if (key == 65) {
            return false;
        }
        if (key == 13) {
            calculate()
        }
    }
}

inputDisplay.onblur = () => {
    display.style.border = '1px solid #888'
    display.style.transition = '.3s'

    window.onkeydown = function () {
        var key = event.keyCode || event.charCode || e.which;
        if (key == 65) {
            return true;
        }
    }
}

historicBtnClose.onclick = () => {
    historicContent.style.display = 'none'
    historicHeader.style.display = 'none'
    historicContentIsDisplayBlock = false
    historicBtn.style.display = 'block'
    if (window.screen.width <= 768) {
        container.style.height = '93vh'
    }
}

btnDarkMode.onclick = function () {
    this.classList.toggle('active')
    darkModeContainer.classList.toggle('active')
    container.classList.toggle('active')
    inputDisplay.classList.toggle('active')
    btnPoint.classList.toggle('active')
    btnClear.classList.toggle('active')
    btnDelete.classList.toggle('active')
    btnSquareRoot.classList.toggle('active')
    historicBtn.classList.toggle('active')
    historicContent.classList.toggle('active')
    warningMessage.classList.toggle('active')
    historicHeader.classList.toggle('active')
    moonIcon.classList.toggle('active')
    sunIcon.classList.toggle('active')
    historicBtnClose.classList.toggle('active')
    btnCalculate.classList.toggle('active')
    for (let i = 0; i < 10; i++) {
        btnNumber[i].classList.toggle('active')
    }
    for (let i = 0; i < 5; i++) {
        btnOperationSymbol[i].classList.toggle('active')
    }

    if (keyName != 'Enter') {
        btnDarkMode.blur()
    }
    keyName = ''
}

if (table.length == 0) {
    let divElement = document.createElement('div')
    divElement.setAttribute('id', 'warning-message')
    let message = document.createTextNode = 'Seus cálculos e resultados são exibidos aqui para que você possa reutilizá-los.'
    divElement.append(message)
    historicContent.appendChild(divElement)
}

const warningMessage = document.querySelector('#warning-message')

// faz com que o cursor do input sempre vá para o final
function moveCursorToEnd(id) {
    var el = document.getElementById(id)
    el.focus()
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function addNumber(n) {
    if (keyName != 'Enter') {
        inputDisplay.focus()
    }
    keyName = ''

    let firstCharacter = inputDisplay.value.substring(0, 1)

    if (inputDisplay.value.length == 1 && inputDisplay.value == 0) {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += n
    } else {
        inputDisplay.value += n
    }

    // Não deixar digitar algum número depois de %
    let lastTwoCharacter = inputDisplay.value.substring(inputDisplay.value.length - 2, inputDisplay.value.length)

    for (let i = 0; i < 10; i++) {
        if (lastTwoCharacter == `%${i}`) {
            inputDisplay.value = inputDisplay.value.slice(0, - 1)
        }
    }

    if (isCalculated && firstCharacter != '√') {
        inputDisplay.value = n
        historicElement.innerText = `Ans = ${accountResult}`
        accountResult = 0
        isCalculated = false
    }
}

function putOperationSymbol(symbol) {
    if (keyName != 'Enter') {
        inputDisplay.focus()
    }
    keyName = ''

    let firstCharacter = inputDisplay.value.substring(0, 1)

    // Não permite digitar sinais senão o '-' como primeiro valor do input
    if (inputDisplay.value.length == 1 && firstCharacter == 0) {
        if (symbol == '-') {
            inputDisplay.value = `${symbol}`
        }
    }

    // permite mudar do sinal '-' para outros sinais colocando um 0 antes quando no começo do input
    if (inputDisplay.value == '-' && symbol != '-') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += `0${symbol}`
    }

    let firstTwoCharacter = inputDisplay.value.substring(0, 2)

    // Não permite digitar mais que dois sinais de '-' no começo do input
    if (firstTwoCharacter == '-') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    let inputText = inputDisplay.value

    if (firstCharacter == "-") {
        inputText = inputText.replace("-", '')
    }

    let isSquareRootSymbol = false

    if (firstCharacter == "√") {
        isSquareRootSymbol = true
    }

    inputText = inputText.replace("e+", 'e')

    let getSymbolFromInput = ''

    let hasSymbolInInput = inputText

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('x-', ' x- ')
        getSymbolFromInput = 'x-'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('÷-', ' ÷- ')
        getSymbolFromInput = '÷-'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('+', ' + ')
        getSymbolFromInput = '+'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('-', ' - ')
        getSymbolFromInput = '-'
    }


    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('x', ' x ')
        getSymbolFromInput = 'x'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('÷', ' ÷ ')
        getSymbolFromInput = '÷'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('%', ' % ')
        getSymbolFromInput = '%'

    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('', ' ')
        getSymbolFromInput = ''
    }

    let caughtSymbol = getSymbolFromInput

    let num2 = ''

    if (caughtSymbol != '') {
        num2 = String(inputText.substring(inputText.indexOf(`${caughtSymbol}`) + 1))
    }

    let hasNum2 = false

    if (num2.length >= 1) {
        caughtSymbol = ''
        hasNum2 = true
    }

    if (caughtSymbol == '+') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += symbol
    }

    if (caughtSymbol == '-') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += symbol
    }

    // Deixa digitar '-' depois do 'x'
    if (caughtSymbol == 'x' && symbol == '-') {
        inputDisplay.value += symbol
    }

    if (caughtSymbol == 'x') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += symbol
    }

    // Deixa digitar '-' depois do '÷'
    if (caughtSymbol == '÷' && symbol == '-') {
        inputDisplay.value += symbol
    }

    if (caughtSymbol == '÷') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += symbol
    }

    if (caughtSymbol == '%') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += symbol
    }

    if (caughtSymbol == '' && hasNum2 == false) {
        inputDisplay.value += symbol
    }

    if (isCalculated) {
        numberToBeDeleted = String(accountResult)
        accountResult = 0
        isCalculated = false
    }

    if (isSquareRootSymbol == true) {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    inputDisplay.removeEventListener('keypress', notAllowToTypePoint)
}

function operationSquareRoot(symbolSquareRoot) {
    if (keyName != 'Enter') {
        inputDisplay.focus()
    }
    keyName = ''

    if (inputDisplay.value.length == 1 && inputDisplay.value == 0) {
        inputDisplay.value = symbolSquareRoot

        inputDisplay.addEventListener("keypress", notAllowTypingOperationSymbol)
    }
}

function typeInInput() {
    if (inputDisplay.value.length == 0) {
        inputDisplay.value = 0
    }

    if (inputDisplay.value.length == numberToBeDeleted.length - 1) {
        inputDisplay.value = 0
        numberToBeDeleted = ''
    }

    let inputText = inputDisplay.value

    // pega o último caractere digitado no input
    let lastCharacter = inputDisplay.value.substring(inputDisplay.value.length - 1, inputDisplay.value.length)

    if (lastCharacter == '/') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += '÷'
    }

    if (lastCharacter == '*') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += 'x'
    }

    let isNumber = false

    for (let i = 0; i < 10; i++) {
        if (lastCharacter == `${i}`) {
            isNumber = true
        }
    }

    console.log(keyName)

    if (isCalculated == true && lastCharacter == '.' && keyName != 'Backspace') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        historicElement.innerText = `Ans = ${inputDisplay.value}`
        inputDisplay.value = '0.'
        accountResult = 0
        isCalculated = false
        console.log('p')
    }

    if (isCalculated == true && isNumber == false && keyName != 'Backspace') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        historicElement.innerText = `Ans = ${inputDisplay.value}`
        inputDisplay.value = `${accountResult}${lastCharacter}`
        numberToBeDeleted = String(accountResult)
        accountResult = 0
        isCalculated = false
        console.log('p4')
    }

    if (isCalculated == false && lastCharacter == '/') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += '÷'
    }

    if (isCalculated == false && lastCharacter == '*') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += 'x'
    }

    if (isCalculated == true && isNumber == true && keyName != 'Backspace') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        historicElement.innerText = `Ans = ${inputDisplay.value}`
        inputDisplay.value = lastCharacter
        numberToBeDeleted = String(accountResult)
        accountResult = 0
        isCalculated = false
        numberToBeDeleted = ''
        console.log('p4')

    }

    // inicia como 0+ ...
    if (inputText == '0+' || inputText == '0x' || inputText == '0%' && inputText != '-') {
        inputDisplay.value += `${lastCharacter}`
    }

    if (inputText == '0/' && inputText != '-') {
        inputDisplay.value += '÷'
    }

    if (inputText == '0*' && inputText != '-') {
        inputDisplay.value += 'x'
    }

    // Muda de - para 0+ ...
    if (inputText == '-+' || inputText == '-/' || inputText == '-x' || inputText == '-%' || inputText == '-*' && inputText != '-') {
        inputDisplay.value = `0${inputDisplay.value}`
    }

    let lastTwoCharacter = inputDisplay.value.substring(inputDisplay.value.length - 2, inputDisplay.value.length)

    if (lastTwoCharacter == '--' && inputDisplay.value.length == 2) {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (lastTwoCharacter == '√√') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    let firstCharacter = inputDisplay.value.substring(0, 1)

    if (inputDisplay.value.length == 2 && firstCharacter == 0) {
        for (let i = 0; i < 10; i++) {
            if (lastTwoCharacter == `0${i}`) {
                inputDisplay.value = inputDisplay.value.slice(0, - 1)
            }
        }
        inputDisplay.value = lastCharacter
    }

    // Não permite digitar outros sinais quando tem o de raiz quadrada
    if (firstCharacter == '√' && lastCharacter == '+') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (firstCharacter == '√' && lastCharacter == '-') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (firstCharacter == '√' && lastCharacter == '/') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (firstCharacter == '√' && lastCharacter == 'x') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (firstCharacter == '√' && lastCharacter == '%') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    for (let i = 0; i < 10; i++) {
        if (lastTwoCharacter == `%${i}`) {
            inputDisplay.value = inputDisplay.value.slice(0, - 1)
        }
    }

    let isSymbolDivisionOrMultiplicationAndMinus = false

    let lastThreeCharacter = inputDisplay.value.substring(inputDisplay.value.length - 3, inputDisplay.value.length)

    // For symbol of the Division and Minus in a row
    if (lastThreeCharacter == '÷-+' || lastThreeCharacter == '÷--' || lastThreeCharacter == '÷-x' || lastThreeCharacter == '÷-÷' || lastThreeCharacter == '÷-%') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        isSymbolDivisionOrMultiplicationAndMinus = true
    }

    // For symbol of the Multiplication and Minus in a row
    if (lastThreeCharacter == 'x-+' || lastThreeCharacter == 'x--' || lastThreeCharacter == 'x-x' || lastThreeCharacter == 'x-÷' || lastThreeCharacter == 'x-%') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        isSymbolDivisionOrMultiplicationAndMinus = true
    }

    if (isSymbolDivisionOrMultiplicationAndMinus == false && lastTwoCharacter == '-+' || lastTwoCharacter == '++' || lastTwoCharacter == '÷+' || lastTwoCharacter == 'x+' || lastTwoCharacter == '%+') {
        inputDisplay.value = inputDisplay.value.slice(0, - 2)
        inputDisplay.value += '+'
    }

    if (isSymbolDivisionOrMultiplicationAndMinus == false && lastTwoCharacter == '--' || lastTwoCharacter == '+-' || lastTwoCharacter == '%-') {
        inputDisplay.value = inputDisplay.value.slice(0, - 2)
        inputDisplay.value += '-'
    }

    if (isSymbolDivisionOrMultiplicationAndMinus == false && lastTwoCharacter == '-x' || lastTwoCharacter == '+x' || lastTwoCharacter == '÷x' || lastTwoCharacter == 'xx' || lastTwoCharacter == '%x') {
        inputDisplay.value = inputDisplay.value.slice(0, - 2)
        inputDisplay.value += 'x'
    }

    if (isSymbolDivisionOrMultiplicationAndMinus == false && lastTwoCharacter == '-÷' || lastTwoCharacter == '+÷' || lastTwoCharacter == 'x÷' || lastTwoCharacter == '÷÷' || lastTwoCharacter == '%÷') {
        inputDisplay.value = inputDisplay.value.slice(0, - 2)
        inputDisplay.value += '÷'
    }

    if (isSymbolDivisionOrMultiplicationAndMinus == false && lastTwoCharacter == '-%' || lastTwoCharacter == '+%' || lastTwoCharacter == 'x%' || lastTwoCharacter == '%%' || lastTwoCharacter == '÷%') {
        inputDisplay.value = inputDisplay.value.slice(0, - 2)
        inputDisplay.value += '%'
    }

    let inputTextAfterTreatment = inputDisplay.value

    inputTextAfterTreatment = inputTextAfterTreatment.replace('e+', 'e')

    let getSymbolFromInput = ''

    let firstCharacterTextTreated = inputTextAfterTreatment.substring(0, 1)

    if (firstCharacterTextTreated == "-") {
        inputTextAfterTreatment = inputTextAfterTreatment.replace("-", '')
    }

    let inputTextAfterTreatmentVerified = inputTextAfterTreatment

    if (inputTextAfterTreatmentVerified.length == inputTextAfterTreatment.length) {
        inputTextAfterTreatmentVerified = inputTextAfterTreatment.replace('+', ' + ')
        getSymbolFromInput = '+'
    }

    if (inputTextAfterTreatmentVerified.length == inputTextAfterTreatment.length) {
        inputTextAfterTreatmentVerified = inputTextAfterTreatment.replace('-', ' - ')
        getSymbolFromInput = '-'
    }

    if (inputTextAfterTreatmentVerified.length == inputTextAfterTreatment.length) {
        inputTextAfterTreatmentVerified = inputTextAfterTreatment.replace('x', ' x ')
        getSymbolFromInput = 'x'
    }

    if (inputTextAfterTreatmentVerified.length == inputTextAfterTreatment.length) {
        inputTextAfterTreatmentVerified = inputTextAfterTreatment.replace('÷', ' ÷ ')
        getSymbolFromInput = '÷'
    }

    if (inputTextAfterTreatmentVerified.length == inputTextAfterTreatment.length) {
        inputTextAfterTreatmentVerified = inputTextAfterTreatment.replace('%', ' % ')
        getSymbolFromInput = '%'
    }

    if (inputTextAfterTreatmentVerified.length == inputTextAfterTreatment.length) {
        inputTextAfterTreatmentVerified = inputTextAfterTreatment.replace('', ' ')
        getSymbolFromInput = ''
    }

    let caughtSymbol = getSymbolFromInput

    let num2 = ''

    if (caughtSymbol.length != 0) {
        num2 = String(inputTextAfterTreatment.substring(inputTextAfterTreatment.indexOf(`${caughtSymbol}`) + 1))
    }

    if (lastTwoCharacter == '-.' && num2.length == 0) {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += '0.'
        console.log('p')
    }

    console.log("num2: " + num2)

    console.log("num2 length: " + num2.length)

    // não deixa escrever +-/x...
    if (num2.length >= 1) {
        inputDisplay.addEventListener("keypress", notAllowTypingOperationSymbol)
    }

    // pode escrever +-/x...
    if (num2.length == 0) {
        inputDisplay.removeEventListener("keypress", notAllowTypingOperationSymbol)
    }

    // colocar somente 1 ponto no primeiro número por digitação no input
    let inputTextNum1 = inputDisplay.value
    let havePointInNum1Verified = inputTextNum1

    let havePointInNum1 = false

    if (havePointInNum1Verified.length == inputTextNum1.length) {
        havePointInNum1Verified = inputTextNum1.replace('.', ' . ')
        havePointInNum1 = true
    }

    if (havePointInNum1Verified.length == inputTextNum1.length) {
        havePointInNum1Verified = inputTextNum1.replace('', ' ')
        havePointInNum1 = false
        inputDisplay.removeEventListener('keypress', notAllowToTypePoint)
    }

    if (havePointInNum1 == false && lastCharacter == '.') {
        inputDisplay.value += '.'
    }

    if (havePointInNum1 == true && lastCharacter == '.') {
        inputDisplay.addEventListener('keypress', notAllowToTypePoint)
    }

    // colocar somente 1 ponto no segundo número por digitação no input

    if (caughtSymbol.length == 1 && num2.length == 0) {
        inputDisplay.removeEventListener('keypress', notAllowToTypePoint)
    }

    let inputTextNum2 = num2
    let havePointInNum2Verified = inputTextNum2

    let havePointInNum2 = false

    if (havePointInNum2Verified.length == inputTextNum2.length) {
        havePointInNum2Verified = inputTextNum2.replace('.', ' . ')
        havePointInNum2 = true
    }

    if (havePointInNum2Verified.length == inputTextNum2.length) {
        havePointInNum2Verified = inputTextNum2.replace('', ' ')
        havePointInNum2 = false
    }

    if (havePointInNum2 == false && caughtSymbol.length == 1 && lastCharacter == '.') {
        inputDisplay.value += '.'
    }

    if (havePointInNum2 == true && caughtSymbol.length == 1 && lastCharacter == '.') {
        inputDisplay.addEventListener('keypress', notAllowToTypePoint)
    }

    if (havePointInNum2 == false && caughtSymbol.length == 1 && num2.length >= 1) {
        inputDisplay.removeEventListener('keypress', notAllowToTypePoint)
    }

    // Não permite digitar '.' depois que escrever e apagar o sinal de operação /bug/. Usa o havePointInNum1 do primeiro número, o método de cima no caso.
    if (havePointInNum1 == true && caughtSymbol.length == 0 && num2.length == 0) {
        inputDisplay.addEventListener('keypress', notAllowToTypePoint)
    }

    let isReducedNumber = inputDisplay.value

    isReducedNumber = isReducedNumber.replace('e+', '')

    if (isReducedNumber.length != inputDisplay.value.length && caughtSymbol == '' && lastCharacter == '.') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (lastCharacter == '.' && caughtSymbol == '' && firstCharacter == '0' && keyName != 'Backspace') {
        inputDisplay.value = '0.'
        console.log('p4')

    }

    
    if (isCalculated == true && keyName == 'Backspace') {
        historicElement.innerText = `Ans = ${document.querySelector('#td3').textContent}`
        inputDisplay.value = '0'
        accountResult = 0
        isCalculated = false
        console.log('p4')
    }

    if (lastTwoCharacter == '%.') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }
}

function checkChar(e) {
    var char = String.fromCharCode(e.keyCode);

    // console.log(char)
    var pattern = `[0-9,.]`
    if (char.match(pattern)) {
        return true;
    }

}

function notAllowTypingOperationSymbol(e) {
    if (!checkChar(e)) {
        e.preventDefault();
    }
}

function checkCharPoint(e) {
    var char = String.fromCharCode(e.keyCode);

    // console.log(char)
    var pattern = `[-,+,/,*,%,x,0-9]`
    if (char.match(pattern)) {
        return true;
    }
}

function notAllowToTypePoint(e) {
    if (!checkCharPoint(e)) {
        e.preventDefault();
    }
}

function calculate() {
    inputDisplay.focus()

    let getSymbolFromInput = ''
    let inputText = inputDisplay.value
    let isMinus = false
    let isSquareRoot = false
    let NumberSquareRoot = ''
    let isReducedNumber = false

    // pegar o primeiro caractere da string(input)
    let firstCharacter = inputText.substring(0, 1)

    // retirar o simbolo de '-' se houver
    if (firstCharacter == "-") {
        isMinus = true
        inputText = inputText.replace("-", '')
    }

    if (firstCharacter == "√") {
        isSquareRoot = true
        inputText = inputText.replace("√", '')
        NumberSquareRoot = inputText
    }

    let exponencialText = inputText.replace("e+", 'e')

    if (exponencialText.length != inputText.length) {
        inputText = inputText.replace("e+", 'e')
        isReducedNumber = true
    }

    let hasSymbolInInput = inputText

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('x-', ' x- ')
        getSymbolFromInput = 'x'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('÷-', ' ÷- ')
        getSymbolFromInput = '÷'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('+', ' + ')
        getSymbolFromInput = '+'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('-', ' - ')
        getSymbolFromInput = '-'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('x', ' x ')
        getSymbolFromInput = 'x'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('÷', ' ÷ ')
        getSymbolFromInput = '÷'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('%', ' % ')
        getSymbolFromInput = '%'
    }

    if (hasSymbolInInput.length == inputText.length) {
        hasSymbolInInput = inputText.replace('', ' ')
        getSymbolFromInput = ''
    }

    let caughtSymbol = getSymbolFromInput

    let num1 = Number(inputText.split(`${caughtSymbol}`, 1)[0])

    // colocar o simbolo de '-' se houver
    if (isMinus == true) {
        num1 = Number(`-${num1}`)
    }

    // console.log(num1)

    let num2 = Number(inputText.substring(inputText.indexOf(`${caughtSymbol}`) + 1))

    // console.log(num2)

    // historic
    let accountMade = inputDisplay.value

    switch (caughtSymbol) {
        case '+':
            accountResult = Number(num1) + Number(num2)
            break
        case '÷':
            accountResult = Number(num1) / Number(num2)
            break
        case 'x':
            accountResult = Number(num1) * Number(num2)
            break
        case '%':
            accountResult = Number(num1 / 100)
            break
        case '-':
            accountResult = Number(num1) - Number(num2)
            break
    }

    let allowCreation = false

    let hasPoint = false

    let hasPointText = inputText

    hasPointText = hasPointText.replace('.', '')

    if (hasPointText.length != inputText.length) {
        hasPoint = true
    }

    if (firstCharacter == '-') {
        inputText = `-${inputText}`
    }

    if (hasPoint == true && String(num1).length + 2 == inputText.length) {
        historicElement.innerText = `${historicElement.textContent}`
        inputDisplay.value = inputDisplay.value
        allowCreation = false
    }

    if (isReducedNumber == true && String(num1).length + 1 != inputDisplay.value.length && isNaN(num2) == false) {
        historicElement.innerText = `${inputDisplay.value} =`
        inputDisplay.value = accountResult
        allowCreation = true
        isCalculated = true
    }

    if (isNaN(num2) == false) {
        if (caughtSymbol != '' && String(num1).length + 1 != inputText.length && isReducedNumber == false) {
            historicElement.innerText = `${inputDisplay.value} =`
            inputDisplay.value = accountResult
            allowCreation = true
            isCalculated = true
        }
    }

    if (String(num1).length + 1 == inputText.length && isReducedNumber == false && caughtSymbol != '%' || isNaN(num2)) {
        historicElement.innerText = `${historicElement.textContent}`
        inputDisplay.value = inputDisplay.value
        allowCreation = false
    }

    if (caughtSymbol == '%') {
        historicElement.innerText = `${inputDisplay.value} =`
        inputDisplay.value = accountResult
        allowCreation = true
        isCalculated = true
    }

    if (isSquareRoot == true && NumberSquareRoot != '') {
        historicElement.innerText = `${inputDisplay.value} =`
        accountResult = Math.sqrt(NumberSquareRoot)
        inputDisplay.value = accountResult
        allowCreation = true
        isCalculated = true
    }


    inputDisplay.removeEventListener("keypress", notAllowTypingOperationSymbol)
    inputDisplay.removeEventListener('keypress', notAllowToTypePoint)

    // Histórico
    let tableElement = document.createElement('table')
    let td1Element = document.createElement('td')
    let td2Element = document.createElement('td')
    let td3Element = document.createElement('td')

    if (allowCreation == true) {
        let account = `${accountMade}`
        let result = `${accountResult}`

        td1Element.setAttribute('id', 'td1')
        td2Element.setAttribute('id', 'td2')
        td3Element.setAttribute('id', 'td3')

        let textTd1 = document.createTextNode = `${account}`
        let textTd2 = document.createTextNode = '='
        let textTd3 = document.createTextNode = `${result}`

        td1Element.append(textTd1)
        td2Element.append(textTd2)
        td3Element.append(textTd3)

        tableElement.appendChild(td1Element)
        tableElement.appendChild(td2Element)
        tableElement.appendChild(td3Element)
        historicContent.appendChild(tableElement)

    }

    td1Element.onclick = () => {
        if (isCalculated == true) {
            historicElement.innerText = `Ans = ${inputDisplay.value}`
        }
        inputDisplay.value = td1Element.textContent
        isCalculated = false

        numberToBeDeleted = ''

        let isReducedNumber = inputDisplay.value

        isReducedNumber = isReducedNumber.replace('e+', '')

        if (isReducedNumber.length != inputDisplay.value.length) {
            numberToBeDeleted = String(num1)
        }
    }

    td3Element.onclick = () => {
        if (isCalculated == true) {
            historicElement.innerText = `Ans = ${inputDisplay.value}`
        }
        inputDisplay.value = td3Element.textContent
        isCalculated = false
        numberToBeDeleted = td3Element.textContent
    }

    let widthScreen = window.screen.width

    if (widthScreen <= 425 && table.length == 5) {
        historicContent.style.overflowY = 'scroll'
    }

    if (widthScreen <= 768 && table.length == 9) {
        historicContent.style.overflowY = 'scroll'
    }

    if (table.length == 13) {
        historicContent.style.overflowY = 'scroll'
    }

    if (table.length == 1) {
        warningMessage.style.display = 'none'
    }

    historicContent.scrollTop = historicContent.scrollHeight
}

function clean() {
    if (keyName != 'Enter') {
        inputDisplay.focus()
    }
    keyName = ''

    if (inputDisplay.value == 0) {
        historicElement.innerText = ''
    }

    if (isCalculated && inputDisplay.value != 0) {
        historicElement.innerText = `Ans = ${inputDisplay.value}`
        inputDisplay.value = 0
        isCalculated == false
    }

    inputDisplay.value = 0

    isCalculated = false

    inputDisplay.removeEventListener('keypress', notAllowToTypePoint)
    inputDisplay.removeEventListener("keypress", notAllowTypingOperationSymbol)
}



function eraser() {
    if (keyName != 'Enter') {
        inputDisplay.focus()
    }
    keyName = ''

    if (isCalculated && inputDisplay.value != 0) {
        historicElement.innerText = `Ans = ${inputDisplay.value}`
        inputDisplay.value = 0

        isCalculated == false
    }

    if (inputDisplay.value.length == numberToBeDeleted.length) {
        inputDisplay.value = 0
        numberToBeDeleted = ''
    }

    inputDisplay.value = inputDisplay.value.slice(0, - 1)

    inputDisplay.removeEventListener("keypress", notAllowToTypePoint)

    if (inputDisplay.value.length < 1) {
        inputDisplay.removeEventListener("keypress", notAllowTypingOperationSymbol)
    }

    if (inputDisplay.value.length == 0) {
        inputDisplay.value = 0
    }

}

function putPoint() {
    if (keyName != 'Enter') {
        inputDisplay.focus()
    }
    keyName = ''

    if (inputDisplay.value.length == 0) {
        inputDisplay.value += '0.'
    }

    // pegar os dois últimos caracteres da string
    let haveTwoPointsInARow = inputDisplay.value.substring(inputDisplay.value.length - 2, inputDisplay.value.length)

    // não permite digitar mais que 1 ponto
    if (haveTwoPointsInARow == '..') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    // Colocar ponto no primeiro número
    let inputTextNum1 = inputDisplay.value
    let havePointInNum1Verified = inputTextNum1

    let havePointInNum1 = false

    if (havePointInNum1Verified.length == inputTextNum1.length) {
        havePointInNum1Verified = inputTextNum1.replace('.', ' . ')
        havePointInNum1 = true
    }

    if (havePointInNum1Verified.length == inputTextNum1.length) {
        havePointInNum1Verified = inputTextNum1.replace('', ' ')
        havePointInNum1 = false
    }

    if (havePointInNum1 == false) {
        inputDisplay.value += '.'
    }

    // Pegar número após o sinal e verificar se há ponto
    let inputTextNum2 = inputDisplay.value

    inputTextNum2 = inputTextNum2.replace('e+', '')

    let firstCharacter = inputTextNum2.substring(0, 1)

    // retirar o simbolo de '-' se houver
    if (firstCharacter == "-") {
        inputTextNum2 = inputTextNum2.replace("-", '')
    }

    if (firstCharacter == '-' && inputDisplay.value.length == 2) {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
        inputDisplay.value += '0.'
    }

    let hasSymbolInInput = inputTextNum2

    if (hasSymbolInInput.length == inputTextNum2.length) {
        hasSymbolInInput = inputTextNum2.replace('+', ' + ')
        getSymbolFromInput = '+'
    }

    if (hasSymbolInInput.length == inputTextNum2.length) {
        hasSymbolInInput = inputTextNum2.replace('-', ' - ')
        getSymbolFromInput = '-'
    }

    if (hasSymbolInInput.length == inputTextNum2.length) {
        hasSymbolInInput = inputTextNum2.replace('x', ' x ')
        getSymbolFromInput = 'x'
    }

    if (hasSymbolInInput.length == inputTextNum2.length) {
        hasSymbolInInput = inputTextNum2.replace('÷', ' ÷ ')
        getSymbolFromInput = '÷'
    }

    if (hasSymbolInInput.length == inputTextNum2.length) {
        hasSymbolInInput = inputTextNum2.replace('%', ' % ')
        getSymbolFromInput = '%'
    }

    if (hasSymbolInInput.length == inputTextNum2.length) {
        hasSymbolInInput = inputTextNum2.replace('', ' ')
        getSymbolFromInput = ''
    }

    let caughtSymbol = getSymbolFromInput

    let num2 = ''

    if (caughtSymbol.length == 1) {
        num2 = String(inputTextNum2.substring(inputTextNum2.indexOf(`${caughtSymbol}`) + 1))
    }

    let receiveNum2 = num2
    let havePointInNum2Verified = receiveNum2

    let havePointInNum2 = false

    if (havePointInNum2Verified.length == receiveNum2.length) {
        havePointInNum2Verified = receiveNum2.replace('.', ' . ')
        havePointInNum2 = true
    }

    if (havePointInNum2Verified.length == receiveNum2.length) {
        havePointInNum2Verified = receiveNum2.replace('', ' ')
        havePointInNum2 = false
    }

    if (havePointInNum2 == false && caughtSymbol.length == 1) {
        inputDisplay.value += '.'
    }

    // Pegar os dois últimos caracteres da string
    let lastTwoCharacter = inputDisplay.value.substring(inputDisplay.value.length - 2, inputDisplay.value.length)

    if (lastTwoCharacter == '%.') {
        inputDisplay.value = inputDisplay.value.slice(0, - 1)
    }

    if (isCalculated) {
        isCalculated = false
        historicElement.textContent = `Ans = ${accountResult}`
        inputDisplay.value = '0.'
        accountResult = 0
        inputDisplay.removeEventListener("keypress", notAllowTypingOperationSymbol)
    }
}