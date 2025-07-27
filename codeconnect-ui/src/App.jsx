import { useState } from 'react';
import axios from 'axios';

function App() {
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');

  const fetchGreeting = () => {
    if (!name.trim()) {
      setGreeting('Please enter a name!');
      return;
    }

    axios.get(`http://localhost:3000/hi/${name}`)
      .then(response => {
        setGreeting(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
        setGreeting('Error fetching greeting');
      });
  };

  return (
    <div className="p-6 text-center font-sans">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Welcome to CodeConnect!</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mr-2"
      />

      <button
        onClick={fetchGreeting}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Get Greeting
      </button>

      <div className="mt-6 text-xl text-purple-700">
        {greeting}
      </div>
    </div>
  );
}

export default App;
