import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const clicker = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Clicks: {count}</h1>
      <button onClick={clicker}>Clique-moi !</button>
    </div>
  );
}

export default App;
