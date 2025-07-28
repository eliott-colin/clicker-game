import background from './assets/background.jpg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const clicker = () => {
    setCount(count + 1);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Clicks: {count}</h1>
        <button onClick={clicker}>Clique-moi !</button>
      </div>
    </div>
  );
}

export default App;
