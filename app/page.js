'use client'

import { useState } from 'react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [operator, setOperator] = useState(null)
  const [prevValue, setPrevValue] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperator = (nextOperator) => {
    const current = parseFloat(display)

    if (prevValue !== null && !waitingForOperand) {
      const result = calculate(prevValue, current, operator)
      setDisplay(String(result))
      setPrevValue(result)
      setExpression(String(result) + ' ' + nextOperator)
    } else {
      setPrevValue(current)
      setExpression(display + ' ' + nextOperator)
    }

    setOperator(nextOperator)
    setWaitingForOperand(true)
  }

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  const handleEquals = () => {
    if (operator === null || waitingForOperand) return
    const current = parseFloat(display)
    const result = calculate(prevValue, current, operator)
    setExpression(expression + ' ' + display + ' =')
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setExpression('')
    setOperator(null)
    setPrevValue(null)
    setWaitingForOperand(false)
  }

  const handleBackspace = () => {
    if (waitingForOperand) return
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        <button className="btn-clear" onClick={handleClear}>AC</button>
        <button className="btn-clear" onClick={handleBackspace}>⌫</button>
        <button className="btn-operator" onClick={() => handleOperator('%')}>%</button>
        <button className="btn-operator" onClick={() => handleOperator('÷')}>÷</button>

        <button className="btn-number" onClick={() => inputDigit(7)}>7</button>
        <button className="btn-number" onClick={() => inputDigit(8)}>8</button>
        <button className="btn-number" onClick={() => inputDigit(9)}>9</button>
        <button className="btn-operator" onClick={() => handleOperator('×')}>×</button>

        <button className="btn-number" onClick={() => inputDigit(4)}>4</button>
        <button className="btn-number" onClick={() => inputDigit(5)}>5</button>
        <button className="btn-number" onClick={() => inputDigit(6)}>6</button>
        <button className="btn-operator" onClick={() => handleOperator('-')}>−</button>

        <button className="btn-number" onClick={() => inputDigit(1)}>1</button>
        <button className="btn-number" onClick={() => inputDigit(2)}>2</button>
        <button className="btn-number" onClick={() => inputDigit(3)}>3</button>
        <button className="btn-operator" onClick={() => handleOperator('+')}>+</button>

        <button className="btn-number btn-zero" onClick={() => inputDigit(0)}>0</button>
        <button className="btn-number" onClick={inputDecimal}>.</button>
        <button className="btn-equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}