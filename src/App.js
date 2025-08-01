import background from './assets/background.jpg';
import './App.css';
import { useState, useEffect , useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [scoreboard, setScoreboard] = useState([]);
  const [cpm, setCpm] = useState(0);
   const clickTimestampsRef = useRef([]);
   



  // Gère tous les clics (manuels et auto)
  const registerClick = () => {
    const now = Date.now();

    clickTimestampsRef.current.push(now);

    clickTimestampsRef.current = clickTimestampsRef.current.filter(
      (ts) => now - ts <= 1000
    );

    setCpm(clickTimestampsRef.current.length);
  };

  const clicker = () => {
    setCount((prev) => prev + 1);
    registerClick();
  };

  // Mettre à jour le compteur toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
      registerClick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);


    const submitScore = async () => {
    if (!name) return alert('Entre ton nom !');
    await fetch('/.netlify/functions/submitScore', {
      method: 'POST',
      body: JSON.stringify({ name, score: count }),
    });
    fetchScores();
  };

  const fetchScores = async () => {
    const res = await fetch('/.netlify/functions/getScores');
    const data = await res.json();
    setScoreboard(data);
  };

  useEffect(() => {
    fetchScores();
  }, []);


  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, width  : "100%", height: "100vh", backgroundSize: "cover" }}>
      <div style={{ textAlign: "center"}}>
        <h1 style={{ margin: "0" }}>Clicks: {count}</h1>

        <button onClick={clicker}>Clique-moi !</button>
        <p style={{ marginTop: "20px" }}>Moyenne : {cpm} clicks par secondes.</p>
      </div>
      <input
        placeholder="Ton nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={submitScore}>Envoyer mon score</button>

      <h2>🏆 Classement</h2>
      <ul>
        {scoreboard.map((entry, i) => (
          <li key={i}>
            {entry.name} - {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
