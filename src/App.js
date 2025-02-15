import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';


function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [calculations, setCalculations] = useState([{ num: ['', ''], result: null }]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTodos(data.slice(0, 10));
    };
    fetchTodos();
  }, []);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => count > 0 && setCount(count - 1);
  const handleReset = () => setCount(0);

  const handleCalculator = (index, operation) => {
    const updatedCalculations = [...calculations];
    const numbers = updatedCalculations[index].num.map(n => parseFloat(n) || 0);

    let result;
    switch (operation) {
      case 'add':
        result = numbers.reduce((acc, val) => acc + val, 0);
        break;
      case 'subtract':
        result = numbers.reduce((acc, val) => acc - val);
        break;
      case 'multiply':
        result = numbers.reduce((acc, val) => acc * val, 1);
        break;
      case 'divide':
        if (numbers.some((num, i) => i !== 0 && num === 0)) {
          alert("Cannot divide by zero");
          return;
        }
        result = numbers.reduce((acc, val) => acc / val);
        break;
      default:
        result = null;
    }

    updatedCalculations[index].result = result;
    setCalculations(updatedCalculations);
  };

  const handleAddNewSet = () => {
    setCalculations([...calculations, { num: ['', ''], result: null }]);
  };

  const handleAddNewInput = (index) => {
    const updatedCalculations = [...calculations];
    updatedCalculations[index].num.push('');
    setCalculations(updatedCalculations);
  };

  const handleRemoveInput = (index) => {
    const updatedCalculations = [...calculations];
    if (updatedCalculations[index].num.length > 2) {
      updatedCalculations[index].num.pop();
    } else {
      updatedCalculations.splice(index, 1);
    }
    setCalculations(updatedCalculations);
  };

  const handleChangeInput = (index, inputIndex, value) => {
    const updatedCalculations = [...calculations];
    updatedCalculations[index].num[inputIndex] = value;
    setCalculations(updatedCalculations);
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>Counter</h1>
        <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>

        <div className="counter">
          <button className="btn" onClick={handleIncrement}>Increment</button>
          <button className="btn" onClick={handleDecrement}>Decrement</button>
          <button className="btn reset" onClick={handleReset}>Reset</button>
          <p>Count: <span className="count-number">{count}</span></p>
        </div>
      </div>

      <div className="glass-card">
        <h2>Calculator</h2>
        {calculations.map((calculation, index) => (
          <div key={index} className="calculator">
            {calculation.num.map((num, numIndex) => (
              <input
                key={numIndex}
                type="number"
                placeholder={`Enter number ${numIndex + 1}`}
                value={num}
                onChange={(e) => handleChangeInput(index, numIndex, e.target.value)}
              />
            ))}
            <div className="calc-buttons">
              <button className="btn1" onClick={() => handleCalculator(index, 'add')}>Add</button>
              <button className="btn1" onClick={() => handleCalculator(index, 'subtract')}>Minus</button>
              <button className="btn1" onClick={() => handleCalculator(index, 'multiply')}>Multiply</button>
              <button className="btn1" onClick={() => handleCalculator(index, 'divide')}>Divide</button>
            </div>
            {calculation.result !== null && (
  <p>Result: <span className="result-number">{calculation.result}</span></p>
)}

            <div className="action-buttons">
            <button className="btn add-new-input" onClick={() => handleAddNewInput(index)}>Add New Input</button>
            <button
              className="btn remove-input"
              onClick={() => handleRemoveInput(index)}
            >
              {calculation.num.length > 2 ? 'Remove Input' : 'Remove'}
            </button>
            </div>
          </div>
        ))}
        <button className="btn add-new-set" onClick={handleAddNewSet}>Add New</button>
      </div>
    </div>
  );
}

export default App;
