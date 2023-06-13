class Calc {
  constructor(firstInputStore, secondInputStore) {
    this.firstInputStore = firstInputStore
    this.secondInputStore = secondInputStore
    this.clearMethod()
  }

  deleteMethod() {
    this.secondInput = this.secondInput.toString().slice(0, -1)
  }

clearMethod() {
    this.secondInput = ''
    this.firstInput = ''
    this.operation = undefined
  }

operationChoice(operation) {
    if (this.secondInput === '') return
    if (this.firstInput !== '') {
      this.calculate()
    }
    this.operation = operation
    this.firstInput = this.secondInput
    this.secondInput = ''
  }

  includeNumb(numb) {
    if (numb === '.' && this.secondInput.includes('.')) return
    this.secondInput = this.secondInput.toString() + numb.toString()
  }


  calculate() {
    let calculation
    const first = parseFloat(this.firstInput)
    const second = parseFloat(this.secondInput)
    if (isNaN(first) || isNaN(second)) return
    switch (this.operation) {
      case '+':
        calculation = first + second
        break
      case '-':
        calculation = first - second
        break
      case '*':
        calculation = first * second
        break
      case '÷':
        calculation = first / second
        break
      default:
        return
    }
    this.secondInput = calculation
    this.operation = undefined
    this.firstInput = ''
  }

  getNumb(numb) {
    const stringNumb = numb.toString()
    const wholeNumb = parseFloat(stringNumb.split('.')[0])
    const decNumb = stringNumb.split('.')[1]
    let wND
    if (isNaN(wholeNumb)) {
      wND = ''
    } else {
      wND = wholeNumb.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decNumb != null) {
      return `${wND}.${decNumb}`
    } else {
      return wND
    }
  }

  updateScreen() {
    this.secondInputStore.innerText =
      this.getNumb(this.secondInput)
    if (this.operation != null) {
      this.firstInputStore.innerText =
        `${this.getNumb(this.firstInput)} ${this.operation}`
    } else {
      this.firstInputStore.innerText = ''
    }
  }
}


const numbButtons = document.querySelectorAll('[data-numb]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-del]')
const clearButton = document.querySelector('[data-clear]')
const firstInputStore = document.querySelector('[data-first-input]')
const secondInputStore = document.querySelector('[data-second-input]')

const calculator = new Calc(firstInputStore, secondInputStore)

equalsButton.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateScreen()
})

clearButton.addEventListener('click', button => {
  calculator.clearMethod()
  calculator.updateScreen()
})

deleteButton.addEventListener('click', button => {
  calculator.deleteMethod()
  calculator.updateScreen()
})
numbButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.includeNumb(button.innerText)
    calculator.updateScreen()
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.operationChoice(button.innerText)
    calculator.updateScreen()
  })
})
