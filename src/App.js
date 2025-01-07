import { useState, useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [result, setResult] = useState(0); // Display the result above

  // Handle number and operator inputs
  function handleInput(value) {
    // Append to the input field
    inputRef.current.value = (inputRef.current.value || "") + value;
  }

  // Evaluate the expression manually
  function equals(e) {
    e.preventDefault();
    const expression = inputRef.current.value;

    try {
      // Manually calculate result without eval
      let calculation = 0;
      let currentNumber = "";
      let currentOperator = "+";

      for (let expCharacter of expression) {
        if (!isNaN(expCharacter) || expCharacter === ".") {
          // Append numbers or decimal point
          currentNumber += expCharacter;
        } else {
          // Process the previous number when an operator is encountered
          calculation = doCalculation(
            calculation,
            currentOperator,
            parseFloat(currentNumber)
          );
          currentOperator = expCharacter; // Update operator
          currentNumber = ""; // Reset current number
        }
      }

      // Process the last number
      calculation = doCalculation(
        calculation,
        currentOperator,
        parseFloat(currentNumber)
      );

      setResult(calculation); // Update result
      inputRef.current.value = ""; // Clear input field
    } catch {
      alert("Invalid expression.");
    }
  }

  // Apply the operator to calculate
  function doCalculation(calculation, operator, number) {
    if (isNaN(number)) return calculation;

    switch (operator) {
      case "+":
        return calculation + number;
      case "-":
        return calculation - number;
      case "x":
        return calculation * number;
      case "/":
        return calculation / number;
      default:
        return calculation;
    }
  }

  // Clear the input field
  function resetInput(e) {
    e.preventDefault();
    inputRef.current.value = "";
  }

  // Reset the result
  function resetResult(e) {
    e.preventDefault();
    setResult(0);
  }

  // Delete the last character
  function deleteLast(e) {
    e.preventDefault();
    inputRef.current.value = inputRef.current.value.slice(0, -1);
  }

  return (
    <div className="container">
      <h1>Calculator</h1>
      <form>
        <div className="display">
          <div className="result">{result}</div>
          <input ref={inputRef} type="text" placeholder="0" readOnly />
        </div>
        <div className="buttons">
          <button className="btn-top" onClick={resetInput}>
            C
          </button>
          <button className="btn-top" onClick={resetResult}>
            AC
          </button>
          <button className="btn-top" onClick={deleteLast}>
            {"\u21E4"}
          </button>
          <button type="button" onClick={() => handleInput("/")}>
            {"\u00F7"}
          </button>
          {[7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", ".", 0].map(
            (expCharacter) => (
              <button
                key={expCharacter}
                type="button"
                onClick={() => handleInput(expCharacter)}
              >
                {expCharacter}
              </button>
            )
          )}
          <button className="btn-equals" onClick={equals}>
            =
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
