import React, { useState } from "react";

const App = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [secretNumber, setSecretNumber] = useState(generateNumber("easy"));
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [status, setStatus] = useState("playing"); // playing | win | lose
  const [hint, setHint] = useState("");

  function generateNumber(level) {
    if (level === "easy") return Math.floor(Math.random() * 50) + 1;
    if (level === "medium") return Math.floor(Math.random() * 100) + 1;
    if (level === "hard") return Math.floor(Math.random() * 150) + 1;
    console.log(level);
  }

  const handleDifficultyChange = (e) => {
    const level = e.target.value;
    setDifficulty(level);
    resetGame(level);
  };

  function getLevel(level) {
    if (level === "easy") return 50;
    if (level === "medium") return 100;
    if (level === "hard") return 200;
  }
  const handleGuess = () => {
    if (status !== "playing") return;

    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) return;

    if (numGuess === secretNumber) {
      setStatus("win");
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      setHistory([...history, numGuess]);
      newAttempts <= 0
        ? setStatus("lose")
        : setHint(
            numGuess < secretNumber ? "Số bí mật lớn hơn" : "Số bí mật nhỏ hơn"
          );
    }
    setGuess("");
  };

  const resetGame = (level = difficulty) => {
    setSecretNumber(generateNumber(level));
    setGuess("");
    setHistory([]);
    setAttemptsLeft(10);
    setStatus("playing");
    setHint("");
  };

  const getHistoryColor = (num) => {
    const range = getLevel(difficulty);
    const diff = Math.abs(secretNumber - num);
    if (diff <= range * 0.3) return "text-primary"; // gần đúng
    return "text-danger"; // quá xa
  };

  return (
    <div>
      <h1>🎮 Trò chơi đoán số</h1>

      <div>
        <label>Chọn độ khó:</label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Dễ (1-50)</option>
          <option value="medium">Trung bình (1-100)</option>
          <option value="hard">Khó (1-200)</option>
        </select>
      </div>

      {/* Nhập số đoán */}
      {status === "playing" && (
        <div>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Nhập số"
          />
          <button onClick={handleGuess}>Đoán</button>
        </div>
      )}

      {/* Thông báo */}
      <div className="mb-4">
        {status === "win" && <p> Bạn đã thắng!</p>}
        {status === "lose" && <p>Bạn đã thua! Số đúng là {secretNumber}</p>}
        {status === "playing" && <p>{hint}</p>}
      </div>

      {/* Lượt còn lại */}
      <p>Lượt còn lại: {attemptsLeft}</p>

      {/* Lịch sử đoán */}
      <div>
        <h2>📜 Lịch sử đoán:</h2>
        <ul className="list-disc list-inside">
          {history.map((num, index) => (
            <li key={index} className={getHistoryColor(num)}>
              {num}
            </li>
          ))}
        </ul>
      </div>

      {/* Nút reset */}
      {(status === "win" || status === "lose") && (
        <button onClick={() => resetGame()}>Chơi lại</button>
      )}
    </div>
  );
};

export default App;
