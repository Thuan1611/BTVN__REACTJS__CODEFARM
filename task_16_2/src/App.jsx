import { useState } from "react";

function App() {
  const [numPlayers, setNumPlayers] = useState(0);
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(null);

  const startGame = () => {
    const newPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      newPlayers.push({
        id: i,
        position: 0,
        history: [],
      });
    }
    setPlayers(newPlayers);
    setTurn(0);
    setWinner(null);
  };

  const rollDice = () => {
    if (winner !== null) return;

    const dice = Math.floor(Math.random() * 6) + 1;
    const newPlayers = [...players];

    const current = newPlayers[turn];
    current.position = Math.min(current.position + dice, 30);
    current.history = [...current.history, dice];

    if (current.position >= 30) {
      setWinner(current.id);
      setPlayers(newPlayers);
      return;
    }

    setPlayers(newPlayers);

    if (dice !== 6) {
      setTurn((prev) => (prev + 1) % numPlayers);
    }
  };

  const resetGame = () => {
    setNumPlayers(0);
    setPlayers([]);
    setTurn(0);
    setWinner(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Cuộc đua xúc xắc</h1>

      {players.length === 0 ? (
        <div>
          <label>Nhập số người chơi (1 - 6): </label>
          <input
            type="number"
            min="1"
            max="6"
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
          />
          <button onClick={startGame} className="btn btn-success">
            Bắt đầu
          </button>
        </div>
      ) : (
        <div>
          <h2>
            {winner !== null
              ? ` Người chơi ${winner + 1} thắng cuộc!`
              : `Lượt của người chơi ${turn + 1}`}
          </h2>

          <div className="p-3 gap-5 d-flex">
            <button
              onClick={rollDice}
              className="btn btn-primary"
              disabled={winner !== null}
            >
              Tung xúc xắc
            </button>
            <button onClick={resetGame} className="btn btn-success">
              Chơi lại
            </button>
          </div>

          <div style={{ marginTop: "20px" }}>
            {players.map((p) => (
              <div key={p.id} style={{ marginBottom: "10px" }}>
                <strong>Người chơi {p.id + 1}:</strong> ô {p.position}
                <br />
                Lịch sử: {p.history.join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
