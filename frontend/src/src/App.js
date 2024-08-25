import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(input);
      const res = await axios.post('http://localhost:3000/bfhl', jsonData); // Updated URL to match local backend
      setResponse(res.data);
      setError('');
    } catch (err) {
      if (err.response) {
        setError(`API error: ${err.response.data.message || err.response.status}`);
      } else if (err.request) {
        setError('No response received from the API');
      } else if (err instanceof SyntaxError) {
        setError('Invalid JSON format');
      } else {
        setError('An unexpected error occurred');
      }
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet, user_id, email, roll_number } = response;

    return (
      <div>
        {/* Display user details */}
        {/* <div>
          <h3>User Details:</h3>
          <p><strong>User ID:</strong> {user_id}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Roll Number:</strong> {roll_number}</p>
        </div> */}

        {/* Filtered response based on selected option */}
        {selectedOption === 'Numbers' && (
          <div>
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOption === 'Alphabets' && (
          <div>
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOption === 'Highest lowercase alphabet' && (
          <div>
            <h3>Highest lowercase alphabet:</h3>
            <p>{highest_lowercase_alphabet}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>{response ? 'Response Data' : 'BFHL Challenge'}</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON input here'
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <div>
            <label htmlFor="options">Select an option:</label>
            <select
              id="options"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Select...</option>
              <option value="Numbers">Numbers</option>
              <option value="Alphabets">Alphabets</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </div>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
